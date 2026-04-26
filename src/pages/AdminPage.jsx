import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

// ── Dados iniciais de demonstração ──────────────────────────────
const DEMO_PEDIDOS = [
  {
    id: 1,
    nome: "Lucas M.",
    tel: "(11) 98001-2345",
    servicos: "Limpeza Completa",
    total: 70,
    pago: 70,
    statusServico: "concluido",
    data: "10/03/2025",
    obs: "Air Jordan 1 branco",
  },
  {
    id: 2,
    nome: "Fernanda R.",
    tel: "(11) 97002-3456",
    servicos: "Pintura Entressola + Impermeabilização",
    total: 125,
    pago: 125,
    statusServico: "concluido",
    data: "25/03/2025",
    obs: "Yeezy 350",
  },
  {
    id: 3,
    nome: "Gabriel S.",
    tel: "",
    servicos: "Impermeabilização",
    total: 35,
    pago: 0,
    statusServico: "andamento",
    data: "01/04/2025",
    obs: "New Balance 574",
  },
  {
    id: 4,
    nome: "Camila T.",
    tel: "",
    servicos: "Restauração de Camurça",
    total: 70,
    pago: 50,
    statusServico: "andamento",
    data: "05/04/2025",
    obs: "Puma suede verde",
  },
  {
    id: 5,
    nome: "Rafael B.",
    tel: "(11) 96003-4567",
    servicos: "Limpeza Premium + Colagem",
    total: 160,
    pago: 100,
    statusServico: "andamento",
    data: "10/04/2025",
    obs: "Balenciaga Triple S",
  },
  {
    id: 6,
    nome: "Laura S.",
    tel: "",
    servicos: "Limpeza Completa + Pintura Cabedal",
    total: 170,
    pago: 0,
    statusServico: "aguardando",
    data: "15/04/2025",
    obs: "",
  },
];

// ── Helpers ──────────────────────────────────────────────────────
const today = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const statusPagamento = (p) => {
  if (p.pago >= p.total) return "pago";
  if (p.pago > 0) return "parcial";
  return "pendente";
};

const falta = (p) => Math.max(0, p.total - p.pago);
const pct = (p) => (p.total > 0 ? Math.round((p.pago / p.total) * 100) : 0);

// ── Sub-componentes ──────────────────────────────────────────────

function Badge({ type }) {
  const map = {
    pago: { cls: "badge-pago", label: "Pago" },
    parcial: { cls: "badge-parcial", label: "Parcial" },
    pendente: { cls: "badge-pendente", label: "Pendente" },
    andamento: { cls: "badge-gold", label: "Em Andamento" },
    concluido: { cls: "badge-pago", label: "Concluído" },
    aguardando: { cls: "badge-pendente", label: "Aguardando" },
  };
  const { cls, label } = map[type] || { cls: "badge-pendente", label: type };
  return <span className={`badge ${cls}`}>{label}</span>;
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div className={`metric-card metric-${color || "neutral"}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  );
}

function ProgressBar({ value, max }) {
  const p = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      style={{
        height: 5,
        background: "var(--surface-3)",
        borderRadius: 99,
        overflow: "hidden",
        marginTop: 5,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${p}%`,
          background: "linear-gradient(90deg,#d4a800,var(--gold))",
          borderRadius: 99,
          transition: "width 0.4s",
        }}
      />
    </div>
  );
}

// ── Modal: Novo/Editar Pedido ────────────────────────────────────
function PedidoModal({ pedido, onSave, onClose }) {
  const [form, setForm] = useState({
    nome: "",
    tel: "",
    servicos: "",
    total: "",
    pago: "",
    statusServico: "andamento",
    data: today(),
    obs: "",
    ...pedido,
  });

  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.nome || !form.servicos || !form.total) {
      alert("Preencha Nome, Serviços e Valor Total.");
      return;
    }
    onSave({
      ...form,
      total: parseFloat(form.total) || 0,
      pago: parseFloat(form.pago) || 0,
    });
  };

  const total = parseFloat(form.total) || 0;
  const pago = parseFloat(form.pago) || 0;
  const diff = Math.max(0, total - pago);
  const p = total > 0 ? Math.min(100, Math.round((pago / total) * 100)) : 0;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target.classList.contains("modal-backdrop")) onClose();
      }}
    >
      <div className="modal">
        <h2 className="modal-title bebas">
          {pedido ? "EDITAR PEDIDO" : "NOVO PEDIDO"}
        </h2>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nome do Cliente *</label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => up("nome", e.target.value)}
              placeholder="Ex: Laura Silva"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Telefone</label>
            <input
              type="text"
              value={form.tel}
              onChange={(e) => up("tel", e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Serviços *</label>
          <input
            type="text"
            value={form.servicos}
            onChange={(e) => up("servicos", e.target.value)}
            placeholder="Ex: Limpeza Completa + Pintura Entressola"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Valor Total (R$) *</label>
            <input
              type="number"
              value={form.total}
              onChange={(e) => up("total", e.target.value)}
              placeholder="160"
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Já Recebido (R$)</label>
            <input
              type="number"
              value={form.pago}
              onChange={(e) => up("pago", e.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {total > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "var(--text-muted)",
                marginBottom: 4,
              }}
            >
              <span style={{ color: "var(--green)" }}>
                Recebido: R$ {pago.toFixed(2)}
              </span>
              <span style={{ color: diff > 0 ? "var(--red)" : "var(--green)" }}>
                Falta: R$ {diff.toFixed(2)} ({p}%)
              </span>
            </div>
            <ProgressBar value={pago} max={total} />
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status do Serviço</label>
            <select
              value={form.statusServico}
              onChange={(e) => up("statusServico", e.target.value)}
            >
              <option value="aguardando">Aguardando</option>
              <option value="andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Data</label>
            <input
              type="text"
              value={form.data}
              onChange={(e) => up("data", e.target.value)}
              placeholder="DD/MM/AAAA"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Observações</label>
          <textarea
            value={form.obs}
            onChange={(e) => up("obs", e.target.value)}
            placeholder="Modelo do tênis, cor, detalhes..."
            style={{ height: 60 }}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-gold" onClick={handleSave}>
            Salvar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Modal: Registrar Pagamento ───────────────────────────────────
function PagamentoModal({ pedido, onSave, onClose }) {
  const [valor, setValor] = useState("");
  const novo = parseFloat(valor) || 0;
  const novoPago = Math.min(pedido.total, pedido.pago + novo);
  const novaFalta = Math.max(0, pedido.total - novoPago);
  const p =
    pedido.total > 0
      ? Math.min(100, Math.round((novoPago / pedido.total) * 100))
      : 0;

  const handleSave = () => {
    if (!novo) {
      alert("Informe o valor recebido.");
      return;
    }
    onSave(novo);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target.classList.contains("modal-backdrop")) onClose();
      }}
    >
      <div className="modal" style={{ maxWidth: 420 }}>
        <h2 className="modal-title bebas">REGISTRAR PAGAMENTO</h2>

        <div style={{ marginBottom: 16 }}>
          {[
            ["Cliente", pedido.nome],
            ["Serviços", pedido.servicos],
            ["Total", `R$ ${pedido.total}`],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 12,
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>{k}</span>
              <span style={{ fontWeight: 700 }}>{v}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 0",
              borderBottom: "1px solid var(--border)",
              fontSize: 12,
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>Já recebido</span>
            <span style={{ fontWeight: 700, color: "var(--green)" }}>
              R$ {pedido.pago}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 0",
              fontSize: 12,
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>Faltava</span>
            <span style={{ fontWeight: 700, color: "var(--red)" }}>
              R$ {falta(pedido)}
            </span>
          </div>
          <ProgressBar value={pedido.pago} max={pedido.total} />
        </div>

        <div className="form-group">
          <label className="form-label">Valor recebido agora (R$)</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            autoFocus
          />
        </div>

        {novo > 0 && (
          <div style={{ marginTop: 8, marginBottom: 10 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "var(--text-muted)",
                marginBottom: 4,
              }}
            >
              <span style={{ color: "var(--green)" }}>
                Novo total: R$ {novoPago.toFixed(2)}
              </span>
              <span
                style={{ color: novaFalta > 0 ? "var(--red)" : "var(--green)" }}
              >
                {novaFalta > 0
                  ? `Falta: R$ ${novaFalta.toFixed(2)}`
                  : "Quitado! ✓"}
              </span>
            </div>
            <ProgressBar value={novoPago} max={pedido.total} />
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-gold" onClick={handleSave}>
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Modal: Detalhes ──────────────────────────────────────────────
function DetailModal({ pedido, onEdit, onClose }) {
  const f = falta(pedido);
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target.classList.contains("modal-backdrop")) onClose();
      }}
    >
      <div className="modal">
        <h2 className="modal-title bebas">{pedido.nome}</h2>
        {[
          ["Data", pedido.data],
          ["Telefone", pedido.tel || "—"],
          ["Serviços", pedido.servicos],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid var(--border)",
              fontSize: 13,
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>{k}</span>
            <span style={{ fontWeight: 700 }}>{v}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid var(--border)",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Status Serviço</span>
          <Badge type={pedido.statusServico} />
        </div>
        <div
          style={{ height: 1, background: "var(--border)", margin: "12px 0" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Valor Total</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: "var(--gold)" }}>
            R$ {pedido.total}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid var(--border)",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Recebido</span>
          <span style={{ fontWeight: 700, color: "var(--green)" }}>
            R$ {pedido.pago}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Falta Receber</span>
          <span
            style={{
              fontWeight: 900,
              color: f > 0 ? "var(--red)" : "var(--green)",
            }}
          >
            {f > 0 ? `R$ ${f}` : "Quitado ✓"}
          </span>
        </div>
        <ProgressBar value={pedido.pago} max={pedido.total} />
        <div
          style={{
            textAlign: "right",
            fontSize: 10,
            color: "var(--text-dim)",
            marginTop: 4,
            marginBottom: pedido.obs ? 12 : 0,
          }}
        >
          {pct(pedido)}% recebido
        </div>
        {pedido.obs && (
          <div
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              fontSize: 12,
              color: "var(--text-muted)",
              marginTop: 10,
            }}
          >
            {pedido.obs}
          </div>
        )}
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Fechar
          </button>
          <button className="btn btn-gold" onClick={onEdit}>
            ✎ Editar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Seção: Dashboard ─────────────────────────────────────────────
function Dashboard({ pedidos }) {
  const totalReceita = pedidos.reduce((a, p) => a + p.total, 0);
  const totalRecebido = pedidos.reduce((a, p) => a + p.pago, 0);
  const totalFalta = pedidos.reduce((a, p) => a + falta(p), 0);
  const ticketMedio = pedidos.length
    ? Math.round(totalReceita / pedidos.length)
    : 0;

  const statusCounts = { pago: 0, parcial: 0, pendente: 0 };
  pedidos.forEach((p) => statusCounts[statusPagamento(p)]++);

  const revenueData = {
    labels: ["Jan", "Fev", "Mar", "Abr"],
    datasets: [
      {
        label: "Faturado",
        data: [310, 450, 540, totalReceita],
        backgroundColor: "rgba(245,200,66,0.2)",
        borderColor: "#f5c842",
        borderWidth: 1.5,
        borderRadius: 5,
      },
      {
        label: "Recebido",
        data: [280, 410, 490, totalRecebido],
        backgroundColor: "rgba(74,222,128,0.2)",
        borderColor: "#4ade80",
        borderWidth: 1.5,
        borderRadius: 5,
      },
    ],
  };

  const statusData = {
    labels: ["Pago", "Parcial", "Pendente"],
    datasets: [
      {
        data: [statusCounts.pago, statusCounts.parcial, statusCounts.pendente],
        backgroundColor: ["#4ade80", "#facc15", "#f87171"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "#555", font: { size: 10 } },
        grid: { color: "#1e1e1e" },
      },
      y: {
        ticks: { color: "#555", font: { size: 10 }, callback: (v) => `R$${v}` },
        grid: { color: "#1e1e1e" },
      },
    },
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: { legend: { display: false } },
  };

  const recentes = [...pedidos].reverse().slice(0, 5);

  return (
    <div>
      {/* Métricas */}
      <div className="metrics-grid">
        <MetricCard
          label="Faturamento Total"
          value={`R$ ${totalReceita.toLocaleString("pt-BR")}`}
          sub={`${pedidos.length} pedidos`}
          color="gold"
        />
        <MetricCard
          label="Total Recebido"
          value={`R$ ${totalRecebido.toLocaleString("pt-BR")}`}
          sub={`${totalReceita > 0 ? Math.round((totalRecebido / totalReceita) * 100) : 0}% do faturamento`}
          color="green"
        />
        <MetricCard
          label="A Receber"
          value={`R$ ${totalFalta.toLocaleString("pt-BR")}`}
          sub={`${pedidos.filter((p) => falta(p) > 0).length} pedidos pendentes`}
          color="red"
        />
        <MetricCard
          label="Ticket Médio"
          value={`R$ ${ticketMedio}`}
          sub="por pedido"
          color="neutral"
        />
      </div>

      {/* Gráficos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div className="card">
          <div className="card-header">
            <span className="card-title">Receita Mensal</span>
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <div style={{ position: "relative", height: 160 }}>
              <Bar data={revenueData} options={chartOptions} />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
              {[
                ["#f5c842", "Faturado"],
                ["#4ade80", "Recebido"],
              ].map(([c, l]) => (
                <span
                  key={l}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    color: "var(--text-muted)",
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: c,
                      display: "inline-block",
                    }}
                  />
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Status de Pagamentos</span>
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <div style={{ position: "relative", height: 140 }}>
              <Doughnut data={statusData} options={donutOptions} />
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              {[
                ["#4ade80", "Pago", statusCounts.pago],
                ["#facc15", "Parcial", statusCounts.parcial],
                ["#f87171", "Pendente", statusCounts.pendente],
              ].map(([c, l, n]) => (
                <span
                  key={l}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 11,
                    color: "var(--text-muted)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c,
                      display: "inline-block",
                    }}
                  />
                  {l} ({n})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Últimos pedidos */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Últimos Pedidos</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Cliente",
                "Serviços",
                "Total",
                "Pago",
                "Pagamento",
                "Serviço",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: 9,
                    fontWeight: 900,
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    padding: "8px 14px",
                    textAlign: "left",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentes.map((p) => (
              <tr key={p.id} style={{ cursor: "default" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {p.nome}
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    maxWidth: 160,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.servicos}
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12 }}>
                  R$ {p.total}
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: 12,
                    color: falta(p) > 0 ? "var(--yellow)" : "var(--green)",
                  }}
                >
                  R$ {p.pago}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <Badge type={statusPagamento(p)} />
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <Badge type={p.statusServico} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Seção: Pedidos ───────────────────────────────────────────────
function Pedidos({
  pedidos,
  onNew,
  onEdit,
  onDelete,
  onPagar,
  onDetail,
  onQuickAdd,
}) {
  const [quickText, setQuickText] = useState("");
  const [filtro, setFiltro] = useState("");

  const handleQuick = () => {
    if (!quickText.trim()) {
      alert("Digite as informações do pedido.");
      return;
    }
    onQuickAdd(quickText);
    setQuickText("");
  };

  const lista = filtro
    ? pedidos.filter((p) => statusPagamento(p) === filtro)
    : [...pedidos];

  return (
    <div>
      {/* Quick Add */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px dashed var(--gold-border)",
          borderRadius: "var(--radius)",
          padding: "16px 18px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 900,
            color: "var(--gold)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            marginBottom: 10,
          }}
        >
          ⚡ Adicionar Pedido Rápido
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            value={quickText}
            onChange={(e) => setQuickText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuick()}
            placeholder="Ex: Laura — Limpeza + Pintura — R$ 160,00"
            style={{
              flex: 1,
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              padding: "10px 14px",
              outline: "none",
            }}
          />
          <button className="btn btn-gold" onClick={handleQuick}>
            Adicionar
          </button>
        </div>
        <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 7 }}>
          Formato sugerido: Nome — Serviços — R$ Valor · Pressione Enter para
          confirmar
        </div>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Todos os Pedidos ({lista.length})</span>
          <div style={{ display: "flex", gap: 8 }}>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text)",
                padding: "5px 10px",
                fontSize: 11,
              }}
            >
              <option value="">Todos</option>
              <option value="pago">Pagos</option>
              <option value="parcial">Parciais</option>
              <option value="pendente">Pendentes</option>
            </select>
            <button className="btn btn-gold btn-sm" onClick={onNew}>
              + Novo
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Data",
                  "Cliente",
                  "Serviços",
                  "Total",
                  "Recebido",
                  "Falta",
                  "Status",
                  "Ações",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: 9,
                      fontWeight: 900,
                      color: "var(--text-dim)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      padding: "8px 14px",
                      textAlign: "left",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...lista].reverse().map((p) => {
                const f = falta(p);
                return (
                  <tr key={p.id}>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 11,
                        color: "var(--text-dim)",
                      }}
                    >
                      {p.data}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {p.nome}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 11,
                        color: "var(--text-muted)",
                        maxWidth: 150,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.servicos}
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: 12 }}>
                      R$ {p.total}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        color: "var(--green)",
                      }}
                    >
                      R$ {p.pago}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        color: f > 0 ? "var(--red)" : "var(--green)",
                        fontWeight: 900,
                      }}
                    >
                      {f > 0 ? `R$ ${f}` : "—"}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <Badge type={statusPagamento(p)} />
                    </td>
                    <td style={{ padding: "8px 14px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => onDetail(p)}
                        >
                          Ver
                        </button>
                        {f > 0 && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => onPagar(p)}
                          >
                            $ Pagar
                          </button>
                        )}
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => onEdit(p)}
                        >
                          ✎
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onDelete(p.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Seção: Financeiro ────────────────────────────────────────────
function Financeiro({ pedidos, onPagar }) {
  const totalReceita = pedidos.reduce((a, p) => a + p.total, 0);
  const totalRecebido = pedidos.reduce((a, p) => a + p.pago, 0);
  const totalFalta = pedidos.reduce((a, p) => a + falta(p), 0);
  const ticketMedio = pedidos.length
    ? Math.round(totalReceita / pedidos.length)
    : 0;

  const svcCount = {};
  pedidos.forEach((p) => {
    p.servicos.split("+").forEach((s) => {
      const key = s.trim().split(" ").slice(0, 2).join(" ");
      svcCount[key] = (svcCount[key] || 0) + 1;
    });
  });
  const svcEntries = Object.entries(svcCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const svcData = {
    labels: svcEntries.map((e) => e[0]),
    datasets: [
      {
        data: svcEntries.map((e) => e[1]),
        backgroundColor: "rgba(245,200,66,0.25)",
        borderColor: "#f5c842",
        borderWidth: 1.5,
        borderRadius: 5,
      },
    ],
  };

  const svcOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "#555", font: { size: 10 }, stepSize: 1 },
        grid: { color: "#1e1e1e" },
      },
      y: {
        ticks: { color: "#888", font: { size: 10 } },
        grid: { display: false },
      },
    },
  };

  const comFalta = pedidos
    .filter((p) => falta(p) > 0)
    .sort((a, b) => falta(b) - falta(a));

  return (
    <div>
      {/* Métricas */}
      <div className="metrics-grid">
        <MetricCard
          label="Faturamento Total"
          value={`R$ ${totalReceita.toLocaleString("pt-BR")}`}
          sub={`${pedidos.length} pedidos`}
          color="gold"
        />
        <MetricCard
          label="Total Recebido"
          value={`R$ ${totalRecebido.toLocaleString("pt-BR")}`}
          sub={`${totalReceita > 0 ? Math.round((totalRecebido / totalReceita) * 100) : 0}% do faturamento`}
          color="green"
        />
        <MetricCard
          label="A Receber"
          value={`R$ ${totalFalta.toLocaleString("pt-BR")}`}
          sub={`${comFalta.length} clientes pendentes`}
          color="red"
        />
        <MetricCard
          label="Ticket Médio"
          value={`R$ ${ticketMedio}`}
          sub="por pedido"
          color="neutral"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* A Receber por cliente */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">A Receber por Cliente</span>
          </div>
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {comFalta.length === 0 ? (
              <div
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: "var(--text-dim)",
                  fontSize: 12,
                }}
              >
                Nenhuma pendência! 🎉
              </div>
            ) : (
              comFalta.map((p) => {
                const f = falta(p);
                return (
                  <div
                    key={p.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <b style={{ fontSize: 12 }}>{p.nome}</b>
                      <span
                        style={{
                          color: "var(--red)",
                          fontWeight: 900,
                          fontSize: 12,
                        }}
                      >
                        - R$ {f}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "var(--text-muted)",
                        fontSize: 11,
                        marginBottom: 6,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.servicos}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 10,
                        color: "var(--text-dim)",
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        R$ {p.pago} de R$ {p.total}
                      </span>
                      <span>{pct(p)}%</span>
                    </div>
                    <ProgressBar value={p.pago} max={p.total} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Serviços mais realizados */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Serviços Mais Realizados</span>
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <div style={{ position: "relative", height: 220 }}>
              <Bar data={svcData} options={svcOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de pendências */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Pendências de Pagamento</span>
        </div>
        {comFalta.length === 0 ? (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: "var(--text-dim)",
              fontSize: 12,
            }}
          >
            Sem pendências de pagamento! 🎉
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Cliente",
                  "Serviço",
                  "Total",
                  "Pago",
                  "Pendente",
                  "Ação",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: 9,
                      fontWeight: 900,
                      color: "var(--text-dim)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      padding: "8px 14px",
                      textAlign: "left",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comFalta.map((p) => (
                <tr key={p.id}>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {p.nome}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 11,
                      color: "var(--text-muted)",
                      maxWidth: 160,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.servicos}
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 12 }}>
                    R$ {p.total}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 12,
                      color: "var(--green)",
                    }}
                  >
                    R$ {p.pago}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      fontSize: 12,
                      color: "var(--red)",
                      fontWeight: 900,
                    }}
                  >
                    R$ {falta(p)}
                  </td>
                  <td style={{ padding: "8px 14px" }}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => onPagar(p)}
                    >
                      Registrar Pagamento
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ── Componente Principal ─────────────────────────────────────────
export default function AdminPage() {
  const [pedidos, setPedidos] = useState(DEMO_PEDIDOS);
  const [nextId, setNextId] = useState(7);
  const [secao, setSecao] = useState("dashboard");
  const [modalNovo, setModalNovo] = useState(false);
  const [editando, setEditando] = useState(null);
  const [pagando, setPagando] = useState(null);
  const [detalhando, setDetalhando] = useState(null);

  const salvarPedido = useCallback(
    (data) => {
      if (data.id) {
        setPedidos((ps) =>
          ps.map((p) =>
            p.id === data.id
              ? {
                  ...data,
                  total: parseFloat(data.total),
                  pago: parseFloat(data.pago),
                }
              : p,
          ),
        );
      } else {
        setPedidos((ps) => [
          ...ps,
          {
            ...data,
            id: nextId,
            total: parseFloat(data.total),
            pago: parseFloat(data.pago),
          },
        ]);
        setNextId((n) => n + 1);
      }
      setModalNovo(false);
      setEditando(null);
    },
    [nextId],
  );

  const deletarPedido = useCallback((id) => {
    if (!window.confirm("Remover este pedido?")) return;
    setPedidos((ps) => ps.filter((p) => p.id !== id));
  }, []);

  const registrarPagamento = useCallback(
    (valor) => {
      setPedidos((ps) =>
        ps.map((p) => {
          if (p.id !== pagando.id) return p;
          const novoPago = Math.min(p.total, p.pago + valor);
          return {
            ...p,
            pago: novoPago,
            statusServico: novoPago >= p.total ? "concluido" : p.statusServico,
          };
        }),
      );
      setPagando(null);
    },
    [pagando],
  );

  const quickAdd = useCallback(
    (texto) => {
      const parts = texto.split("—").map((s) => s.trim());
      const nome = parts[0] || "Cliente";
      const servicos = parts[1] || texto;
      let total = 0;
      const m = texto.match(/R\$\s*([\d.,]+)/i);
      if (m) total = parseFloat(m[1].replace(",", ".")) || 0;
      setPedidos((ps) => [
        ...ps,
        {
          id: nextId,
          nome,
          tel: "",
          servicos,
          total,
          pago: 0,
          statusServico: "andamento",
          data: today(),
          obs: "",
        },
      ]);
      setNextId((n) => n + 1);
    },
    [nextId],
  );

  const SECOES = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "pedidos", icon: "◎", label: "Pedidos" },
    { id: "financeiro", icon: "◉", label: "Financeiro" },
  ];

  return (
    <>
      {/* Estilos inline do painel admin */}
      <style>{`
        .admin-shell { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
        .admin-sidebar { background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; }
        .admin-logo { padding: 20px 18px 16px; border-bottom: 1px solid var(--border); }
        .admin-logo .bebas { font-size: 20px; letter-spacing: 0.12em; }
        .admin-logo .sub { font-size: 9px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.18em; font-weight: 700; margin-top: 2px; }
        .admin-nav { padding: 10px 8px; flex: 1; }
        .admin-nav-label { font-size: 9px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.15em; padding: 10px 10px 5px; }
        .admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text-muted); font-size: 12px; font-weight: 700; border: 1px solid transparent; transition: all 0.15s; margin-bottom: 2px; }
        .admin-nav-item:hover { background: var(--surface-2); color: var(--text); }
        .admin-nav-item.active { background: var(--gold-dim); border-color: var(--gold-border); color: var(--gold); }
        .admin-main { background: var(--bg); display: flex; flex-direction: column; }
        .admin-topbar { padding: 14px 28px; border-bottom: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: space-between; }
        .admin-topbar-title { font-family: var(--font-display); font-size: 22px; letter-spacing: 0.08em; }
        .admin-topbar-badge { background: var(--gold-dim); border: 1px solid var(--gold-border); color: var(--gold); font-size: 10px; font-weight: 900; padding: 3px 10px; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.1em; }
        .admin-content { padding: 24px 28px; flex: 1; overflow-y: auto; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }
        .metric-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; }
        .metric-label { font-size: 10px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 6px; }
        .metric-value { font-family: var(--font-display); font-size: 28px; letter-spacing: 0.04em; line-height: 1; }
        .metric-sub { font-size: 10px; color: var(--text-muted); margin-top: 4px; }
        .metric-gold { border-color: var(--gold-border); }
        .metric-gold .metric-value { color: var(--gold); }
        .metric-green { border-color: var(--green-border); }
        .metric-green .metric-value { color: var(--green); }
        .metric-red { border-color: var(--red-border); }
        .metric-red .metric-value { color: var(--red); }
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 16px; }
        .card-header { padding: 14px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .card-title { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); }
        .badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 99px; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid; }
        .badge-pago { background: var(--green-dim); border-color: var(--green-border); color: var(--green); }
        .badge-parcial { background: rgba(250,204,21,0.1); border-color: rgba(250,204,21,0.28); color: #facc15; }
        .badge-pendente { background: var(--red-dim); border-color: var(--red-border); color: var(--red); }
        .badge-gold { background: var(--gold-dim); border-color: var(--gold-border); color: var(--gold); }
        .btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.15s; border: 1px solid; font-family: var(--font-body); }
        .btn-gold { background: var(--gold); color: #0a0a0a; border-color: var(--gold); }
        .btn-gold:hover { opacity: 0.88; }
        .btn-ghost { background: transparent; color: var(--gold); border-color: var(--gold-border); }
        .btn-ghost:hover { background: var(--gold-dim); }
        .btn-danger { background: transparent; color: var(--red); border-color: var(--red-border); }
        .btn-danger:hover { background: var(--red-dim); }
        .btn-success { background: transparent; color: var(--green); border-color: var(--green-border); }
        .btn-success:hover { background: var(--green-dim); }
        .btn-sm { padding: 5px 10px; font-size: 10px; }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.82); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; }
        .modal-title { font-family: var(--font-display); font-size: 22px; letter-spacing: 0.08em; margin-bottom: 18px; }
        .form-group { margin-bottom: 14px; }
        .form-label { font-size: 9px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 5px; display: block; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .modal-actions { display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end; }
        @media (max-width: 768px) {
          .admin-shell { grid-template-columns: 1fr; }
          .admin-sidebar { display: none; }
          .metrics-grid { grid-template-columns: 1fr 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="admin-shell">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <div className="bebas">
              LIRA <span style={{ color: "var(--gold)" }}>ADMIN</span>
            </div>
            <div className="sub">Painel de Gestão</div>
          </div>
          <nav className="admin-nav">
            <div className="admin-nav-label">Principal</div>
            {SECOES.map((s) => (
              <div
                key={s.id}
                className={`admin-nav-item ${secao === s.id ? "active" : ""}`}
                onClick={() => setSecao(s.id)}
              >
                <span style={{ width: 16, textAlign: "center", fontSize: 14 }}>
                  {s.icon}
                </span>
                {s.label}
              </div>
            ))}
            <div className="admin-nav-label">Ações</div>
            <div className="admin-nav-item" onClick={() => setModalNovo(true)}>
              <span style={{ width: 16, textAlign: "center", fontSize: 16 }}>
                +
              </span>
              Novo Pedido
            </div>
          </nav>
        </aside>

        {/* Main */}
        <div className="admin-main">
          <div className="admin-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="admin-topbar-title">
                {SECOES.find((s) => s.id === secao)?.label?.toUpperCase() ||
                  "ADMIN"}
              </span>
              <span className="admin-topbar-badge">
                {secao === "dashboard"
                  ? "Visão Geral"
                  : secao === "pedidos"
                    ? "Gestão de Pedidos"
                    : "Receita & Pendências"}
              </span>
            </div>
            <button
              className="btn btn-gold btn-sm"
              onClick={() => setModalNovo(true)}
            >
              + Novo Pedido
            </button>
          </div>

          <div className="admin-content">
            {secao === "dashboard" && <Dashboard pedidos={pedidos} />}
            {secao === "pedidos" && (
              <Pedidos
                pedidos={pedidos}
                onNew={() => setModalNovo(true)}
                onEdit={(p) => setEditando(p)}
                onDelete={deletarPedido}
                onPagar={(p) => setPagando(p)}
                onDetail={(p) => setDetalhando(p)}
                onQuickAdd={quickAdd}
              />
            )}
            {secao === "financeiro" && (
              <Financeiro pedidos={pedidos} onPagar={(p) => setPagando(p)} />
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      {modalNovo && (
        <PedidoModal
          onSave={salvarPedido}
          onClose={() => setModalNovo(false)}
        />
      )}
      {editando && (
        <PedidoModal
          pedido={editando}
          onSave={salvarPedido}
          onClose={() => setEditando(null)}
        />
      )}
      {pagando && (
        <PagamentoModal
          pedido={pagando}
          onSave={registrarPagamento}
          onClose={() => setPagando(null)}
        />
      )}
      {detalhando && (
        <DetailModal
          pedido={detalhando}
          onEdit={() => {
            setEditando(detalhando);
            setDetalhando(null);
          }}
          onClose={() => setDetalhando(null)}
        />
      )}
    </>
  );
}
