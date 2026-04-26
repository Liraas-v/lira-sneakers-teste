import React from "react";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import TierCard from "../components/TierCard";
import { useApp } from "../context/AppContext";

export default function PerfilPage() {
  const { user, tier, setPage, handleLogout } = useApp();
  const naoLidas = (user?.notificacoes ?? []).filter((n) => !n.lida).length;

  const MENU_ITEMS = [
    {
      icon: "package",
      label: "Meus Pedidos",
      badge: null,
      action: "meus-pedidos",
      desc: "Acompanhe seus serviços em andamento",
    },
    {
      icon: "clock",
      label: "Histórico de Pontos",
      badge: null,
      action: "fidelidade",
      desc: "Veja seu histórico de pedidos e pontos",
    },
    {
      icon: "gift",
      label: "Resgatar Recompensas",
      badge: null,
      action: "fidelidade",
      desc: "Troque seus pontos por benefícios",
    },
    {
      icon: "bell",
      label: "Notificações",
      badge: naoLidas,
      action: "notificacoes",
      desc: "Atualizações sobre pedidos e promoções",
    },
    {
      icon: "help-circle",
      label: "Suporte",
      badge: null,
      action: "suporte",
      desc: "Perguntas frequentes e contato",
    },
    {
      icon: "shield",
      label: "Painel Admin",
      badge: null,
      action: "admin",
      desc: "Gestão de pedidos e financeiro",
    },
  ];

  const stats = [
    {
      val: (user?.historico ?? []).reduce((a, b) => a + b.total, 0),
      label: "Total gasto",
      prefix: "R$",
    },
    { val: (user?.historico ?? []).length, label: "Pedidos", prefix: "" },
    { val: user?.pontos ?? 0, label: "Pontos", prefix: "" },
    { val: (user?.resgates ?? []).length, label: "Resgates", prefix: "" },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader title="Perfil" />
      <div className="page-wrap">
        <div
          className="card anim-fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 24,
            background:
              "radial-gradient(ellipse at 90% 50%, var(--gold-dim) 0%, var(--surface) 60%)",
          }}
        >
          <img
            src="/logo.png"
            alt={user?.nome}
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--gold-border)",
              flexShrink: 0,
            }}
            onError={(e) => {
              e.target.style.background = "var(--surface-3)";
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 2,
              }}
            >
              {user?.nome}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                marginBottom: 4,
              }}
            >
              {user?.email}
            </p>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: tier.color,
                background: `${tier.color}18`,
                border: `1px solid ${tier.color}35`,
                padding: "3px 10px",
                borderRadius: 99,
              }}
            >
              {tier.icon} Nível {tier.name}
            </span>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 900,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              Pontos
            </p>
            <p
              className="bebas"
              style={{ fontSize: 44, color: "var(--gold)", lineHeight: 1 }}
            >
              {user?.pontos ?? 0}
            </p>
            <button
              className="btn btn-ghost"
              style={{ marginTop: 8, fontSize: 11, padding: "7px 14px" }}
              onClick={() => setPage("fidelidade")}
            >
              Ver programa
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
            gap: 24,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <TierCard />
            <div className="grid-2 anim-fade-up-2">
              {stats.map(({ val, label, prefix }) => (
                <div
                  key={label}
                  className="card"
                  style={{ textAlign: "center", padding: 18 }}
                >
                  <p
                    className="bebas"
                    style={{
                      fontSize: 32,
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {prefix}
                    {val}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--text-dim)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
            className="anim-fade-up-1"
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 900,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 4,
              }}
            >
              Acesso rápido
            </p>
            {MENU_ITEMS.map(({ icon, label, badge, action, desc }) => (
              <button
                key={label}
                onClick={() => setPage(action)}
                style={{
                  width: "100%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.background = "var(--surface-2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "var(--gold-dim)",
                    border: "1px solid var(--gold-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    name={icon}
                    size={16}
                    style={{ color: "var(--gold)" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginTop: 1,
                    }}
                  >
                    {desc}
                  </p>
                </div>
                {badge > 0 && (
                  <span
                    style={{
                      background: "var(--gold)",
                      color: "#0a0a0a",
                      fontSize: 10,
                      fontWeight: 900,
                      padding: "2px 8px",
                      borderRadius: 99,
                      flexShrink: 0,
                    }}
                  >
                    {badge}
                  </span>
                )}
                <Icon
                  name="chevron-right"
                  size={16}
                  style={{ color: "var(--text-dim)", flexShrink: 0 }}
                />
              </button>
            ))}
            <button
              className="btn btn-danger"
              style={{ width: "100%", marginTop: 8, justifyContent: "center" }}
              onClick={handleLogout}
            >
              <Icon name="log-out" size={16} /> Sair da conta
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
