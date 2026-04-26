import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import { useApp } from "../context/AppContext";
import { TIERS, REWARDS } from "../data/constants";

const TABS = [
  ["visao", "Visão Geral"],
  ["resgatar", "Resgatar"],
  ["niveis", "Níveis"],
  ["historico", "Histórico"],
];

export default function FidelidadePage() {
  const { tier, nextTier, progress, user, resgatarRecompensa } = useApp();
  const [tab, setTab] = useState("visao");

  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader
        title="Lira+"
        subtitle="Programa de fidelidade — acumule pontos e resgate recompensas"
      />

      {/* Tier Hero */}
      <div
        className="anim-fade-up"
        style={{
          borderRadius: "var(--radius-lg)",
          border: `1px solid ${tier.color}30`,
          padding: "28px 32px",
          marginBottom: 24,
          background: `radial-gradient(ellipse at 10% 50%, ${tier.color}18 0%, transparent 55%), var(--surface)`,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: "var(--text-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 6,
            }}
          >
            Nível atual
          </p>
          <p
            className="bebas"
            style={{
              fontSize: 36,
              color: tier.color,
              lineHeight: 1,
              marginBottom: 12,
            }}
          >
            {tier.icon} {tier.name}
          </p>
          {nextTier ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "var(--text-dim)",
                  fontWeight: 700,
                  marginBottom: 7,
                }}
              >
                <span>
                  {tier.icon} {tier.name}
                </span>
                <span>
                  {nextTier.icon} {nextTier.name} — {nextTier.min} pts
                </span>
              </div>
              <div className="progress-track" style={{ maxWidth: 400 }}>
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 7,
                }}
              >
                Faltam{" "}
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>
                  {nextTier.min - (user?.pontos ?? 0)} pontos
                </span>{" "}
                para {nextTier.icon} {nextTier.name}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}>
              💎 Nível máximo alcançado!
            </p>
          )}
          <div
            style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}
          >
            {tier.perks.map((perk) => (
              <span
                key={perk}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: 99,
                  border: `1px solid ${tier.color}40`,
                  color: tier.color,
                  background: tier.color + "10",
                }}
              >
                ✓ {perk}
              </span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: "var(--text-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 6,
            }}
          >
            Seus pontos
          </p>
          <p
            className="bebas"
            style={{ fontSize: 56, color: "var(--gold)", lineHeight: 1 }}
          >
            {user?.pontos ?? 0}
          </p>
          <p style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>
            pontos acumulados
          </p>
        </div>
      </div>

      <div className="tabs-wrap" style={{ marginBottom: 24 }}>
        {TABS.map(([id, lbl]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`tab-btn ${tab === id ? "active" : ""}`}
          >
            {lbl}
          </button>
        ))}
      </div>

      {tab === "visao" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="grid-4 anim-fade-in">
            {[
              [
                (user?.historico ?? []).reduce((a, b) => a + b.total, 0),
                "Total gasto",
                "R$",
              ],
              [(user?.historico ?? []).length, "Pedidos", ""],
              [
                (user?.historico ?? []).reduce((a, b) => a + b.pontosGanhos, 0),
                "Pts acumulados",
                "",
              ],
              [(user?.resgates ?? []).length, "Resgates", ""],
            ].map(([val, lbl, prefix]) => (
              <div
                key={lbl}
                className="card"
                style={{ textAlign: "center", padding: "20px 16px" }}
              >
                <p
                  className="bebas"
                  style={{ fontSize: 36, color: "var(--gold)" }}
                >
                  {prefix}
                  {val}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    marginTop: 4,
                  }}
                >
                  {lbl}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "resgatar" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: "var(--gold-dim)",
              border: "1px solid var(--gold-border)",
              borderRadius: "var(--radius-sm)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>⭐</span>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>
              Você tem{" "}
              <span style={{ color: "var(--gold)" }}>
                {user?.pontos ?? 0} pontos
              </span>{" "}
              disponíveis
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 14,
            }}
          >
            {REWARDS.map((r) => {
              const ok = (user?.pontos ?? 0) >= r.points;
              return (
                <div
                  key={r.id}
                  className="card"
                  style={{
                    borderColor: ok ? "var(--gold-border)" : "var(--border)",
                    opacity: ok ? 1 : 0.55,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{r.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: "var(--text)",
                      }}
                    >
                      {r.name}
                    </p>
                    <p
                      style={{
                        color: "var(--gold)",
                        fontWeight: 900,
                        fontSize: 15,
                        marginTop: 2,
                      }}
                    >
                      {r.points} pts
                    </p>
                  </div>
                  <button
                    onClick={() => resgatarRecompensa(r)}
                    disabled={!ok}
                    className={`btn ${ok ? "btn-gold" : ""}`}
                    style={
                      !ok
                        ? {
                            background: "var(--surface-3)",
                            color: "var(--text-dim)",
                            border: "1px solid var(--border)",
                            cursor: "not-allowed",
                            padding: "8px 14px",
                          }
                        : { padding: "8px 14px" }
                    }
                  >
                    {ok ? "Resgatar" : `-${r.points - (user?.pontos ?? 0)} pts`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "niveis" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {TIERS.map((t) => {
            const atual = tier.name === t.name;
            return (
              <div
                key={t.name}
                className="card anim-fade-in"
                style={{
                  borderColor: atual ? t.color + "50" : "var(--border)",
                  background: atual
                    ? `radial-gradient(ellipse at 0% 0%, ${t.color}15 0%, transparent 55%), var(--surface)`
                    : "var(--surface)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div>
                    <p
                      style={{ fontWeight: 900, fontSize: 16, color: t.color }}
                    >
                      {t.name}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-dim)" }}>
                      {t.min}–{t.max === Infinity ? "∞" : t.max} pts
                    </p>
                  </div>
                  {atual && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 10,
                        fontWeight: 900,
                        color: "var(--gold)",
                        border: "1px solid var(--gold-border)",
                        padding: "3px 10px",
                        borderRadius: 99,
                      }}
                    >
                      ATUAL
                    </span>
                  )}
                </div>
                {t.perks.map((p) => (
                  <div
                    key={p}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{ color: t.color, fontWeight: 900, fontSize: 12 }}
                    >
                      ✓
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {tab === "historico" &&
        ((user?.historico ?? []).length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              color: "var(--text-dim)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>
              📋
            </div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Nenhum pedido ainda
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(user?.historico ?? []).map((h) => (
              <div
                key={h.id}
                className="card anim-fade-in"
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--text-dim)",
                      marginBottom: 4,
                    }}
                  >
                    {h.data}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {h.servicos.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--text)",
                        }}
                      >
                        • {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: 15,
                      color: "var(--text)",
                    }}
                  >
                    R$ {h.total},00
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--gold)",
                      fontWeight: 700,
                    }}
                  >
                    +{h.pontosGanhos} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      <BottomNav />
    </div>
  );
}
