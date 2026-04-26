import React from "react";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import BottomNav from "../components/BottomNav";
import { useApp } from "../context/AppContext";

const TIPO_CONFIG = {
  sucesso: {
    cor: "var(--green)",
    bg: "var(--green-dim)",
    border: "var(--green-border)",
    icon: "check-circle",
  },
  conquista: {
    cor: "var(--gold)",
    bg: "var(--gold-dim)",
    border: "var(--gold-border)",
    icon: "award",
  },
  promo: {
    cor: "var(--blue)",
    bg: "var(--blue-dim)",
    border: "rgba(56,189,248,.25)",
    icon: "tag",
  },
  info: {
    cor: "var(--text-muted)",
    bg: "var(--surface-2)",
    border: "var(--border)",
    icon: "info",
  },
};

export default function NotificacoesPage() {
  const { user, marcarNotificacaoLida, marcarTodasLidas, setPage } = useApp();
  const notifs = user?.notificacoes ?? [];
  const naoLidas = notifs.filter((n) => !n.lida).length;

  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader title="Notificações" back="perfil" />
      <div className="page-wrap" style={{ maxWidth: 760 }}>
        <div
          className="anim-fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <p style={{ fontSize: 22, fontWeight: 900, color: "var(--text)" }}>
              Notificações
            </p>
            <p
              style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
            >
              {naoLidas > 0 ? (
                <>
                  <span style={{ color: "var(--gold)" }}>{naoLidas}</span> não{" "}
                  {naoLidas === 1 ? "lida" : "lidas"}
                </>
              ) : (
                "Tudo em dia ✓"
              )}
            </p>
          </div>
          {naoLidas > 0 && (
            <button
              className="btn btn-ghost"
              style={{ fontSize: 11, padding: "9px 16px" }}
              onClick={marcarTodasLidas}
            >
              <Icon name="check-check" size={14} /> Marcar todas como lidas
            </button>
          )}
        </div>

        {notifs.length === 0 ? (
          <div
            className="card anim-fade-in"
            style={{ textAlign: "center", padding: "60px 24px" }}
          >
            <Icon
              name="bell-off"
              size={48}
              style={{ color: "var(--text-dim)", marginBottom: 16 }}
            />
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Nenhuma notificação
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notifs.map((notif, i) => {
              const cfg = TIPO_CONFIG[notif.tipo] ?? TIPO_CONFIG.info;
              return (
                <button
                  key={notif.id}
                  onClick={() => marcarNotificacaoLida(notif.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    opacity: notif.lida ? 0.5 : 1,
                    transition: "opacity 0.2s, transform 0.15s",
                    animation: `fadeUp 0.3s ${i * 0.04}s ease both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon
                    name={cfg.icon}
                    size={20}
                    style={{ color: cfg.cor, flexShrink: 0, marginTop: 1 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 900,
                          color: notif.lida
                            ? "var(--text-muted)"
                            : "var(--text)",
                        }}
                      >
                        {notif.titulo}
                      </p>
                      {!notif.lida && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--gold)",
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        />
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginTop: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      {notif.corpo}
                    </p>
                    <p
                      style={{
                        fontSize: 10,
                        color: "var(--text-dim)",
                        marginTop: 8,
                        fontWeight: 700,
                      }}
                    >
                      {notif.data}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <button
            className="btn btn-ghost"
            style={{ fontSize: 12 }}
            onClick={() => setPage("perfil")}
          >
            <Icon name="arrow-left" size={14} /> Voltar ao perfil
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
