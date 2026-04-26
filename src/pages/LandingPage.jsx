import React, { useState } from "react";
import Icon from "../components/Icon";
import { useApp } from "../context/AppContext";
import {
  SERVICOS,
  PRAZOS,
  DEPOIMENTOS,
  LOCATION,
  NUMEROS,
  WHATSAPP_NUMBER,
} from "../data/constants";

const wppUrl = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const abrirWpp = (msg) => window.open(wppUrl(msg), "_blank");

function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
        background: "rgba(8,8,8,0.95)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src="/logo.png"
            alt="Lira Sneakers"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              objectFit: "cover",
              border: "1px solid var(--gold-border)",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span
            className="bebas"
            style={{
              fontSize: 20,
              letterSpacing: "0.1em",
            }}
          >
            <span
              style={{
                color: "#fff",
              }}
            >
              LIRA{" "}
            </span>
            <span className="shimmer-text">SNEAKERS</span>
          </span>
        </div>
        <nav
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          {[
            ["servicos-section", "Serviços"],
            ["depoimentos", "Depoimentos"],
            ["localizacao", "Localização"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "color 0.2s",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            className="btn btn-ghost"
            style={{ fontSize: 12, padding: "8px 16px" }}
            onClick={onLoginClick}
          >
            <Icon name="user" size={14} />
            Entrar
          </button>
          <button
            className="btn btn-gold"
            style={{ fontSize: 12, padding: "8px 16px" }}
            onClick={() =>
              abrirWpp(
                "Olá! Gostaria de solicitar um orçamento para o meu tênis.",
              )
            }
          >
            <Icon name="message-circle" size={14} />
            Orçamento grátis
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onLoginClick }) {
  return (
    <section
      style={{
        background: `radial-gradient(ellipse at 20% 60%, rgba(245,200,66,0.07) 0%, transparent 55%), var(--bg)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid de pontos de fundo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(245,200,66,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── BLOCO DE DESTAQUE: Logo + Nome ── */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "52px 24px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(245,200,66,0.09) 0%, transparent 70%)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            borderRadius: 99,
            padding: "5px 14px",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--gold)",
              display: "block",
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            Sneaker Spa Profissional · São Paulo, SP
          </span>
        </div>

        {/* Logo grande */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -24,
              background:
                "radial-gradient(circle, rgba(245,200,66,0.18) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(12px)",
            }}
          />
          <img
            src="/logo.png"
            alt="Lira Sneakers"
            className="anim-float"
            style={{
              width: 250,
              height: 250,
              borderRadius: 44,
              objectFit: "contain",
              objectPosition: "center 40%",
              background: "#0a0a0a",
              border: "2px solid var(--gold-border)",
              boxShadow:
                "0 0 48px rgba(245,200,66,0.25), 0 8px 32px rgba(0,0,0,0.5)",
              position: "relative",
              zIndex: 1,
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Nome */}
        <div style={{ textAlign: "center" }}>
          <p
            className="bebas"
            style={{
              fontSize: "clamp(52px, 10vw, 96px)",
              letterSpacing: "0.06em",
              lineHeight: 0.9,
            }}
          >
            <span style={{ color: "#fff" }}>LIRA </span>
            <span className="shimmer-text">SNEAKERS</span>
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              marginTop: 10,
            }}
          >
            Sneaker Spa &nbsp;·&nbsp; Restauração &nbsp;·&nbsp; Proteção
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <button
            className="btn btn-gold"
            style={{ fontSize: 13, padding: "13px 28px" }}
            onClick={() =>
              abrirWpp(
                "Olá! Gostaria de solicitar um orçamento para o meu tênis.",
              )
            }
          >
            <Icon name="message-circle" size={16} /> Solicitar orçamento grátis
          </button>
          <button
            className="btn btn-ghost"
            style={{ fontSize: 13, padding: "13px 22px" }}
            onClick={onLoginClick}
          >
            <Icon name="award" size={16} /> Programa de fidelidade
          </button>
        </div>

        {/* Garantias */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            ["check-circle", "Orçamento sem compromisso"],
            ["check-circle", "Coleta e entrega disponível"],
            ["check-circle", "Garantia de satisfação"],
          ].map(([icon, txt]) => (
            <div
              key={txt}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name={icon} size={13} style={{ color: "var(--green)" }} />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                }}
              >
                {txt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HERO: proposta de valor + números ── */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "64px 24px",
          width: "100%",
          zIndex: 1,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Texto */}
          <div>
            <h2
              className="bebas anim-fade-up"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                marginBottom: 20,
              }}
            >
              SEUS TÊNIS
              <br />
              <span className="shimmer-text">MERECEM</span>
              <br />O MELHOR
            </h2>
            <p
              className="anim-fade-up-1"
              style={{
                fontSize: 16,
                color: "var(--text-muted)",
                lineHeight: 1.65,
                maxWidth: 420,
                marginBottom: 28,
              }}
            >
              Restauração, limpeza e proteção especializada para seus sneakers.
              Do básico ao luxo — tratamos cada par com o cuidado que ele
              merece.
            </p>
            <button
              className="btn btn-ghost anim-fade-up-2"
              style={{ fontSize: 13, padding: "12px 22px" }}
              onClick={() =>
                document
                  .getElementById("servicos-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Icon name="list" size={15} /> Ver todos os serviços
            </button>
          </div>

          {/* Números */}
          <div
            className="anim-fade-up-1"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {NUMEROS.map(({ valor, label }) => (
              <div
                key={label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 18,
                  padding: "22px 16px",
                  textAlign: "center",
                }}
              >
                <p
                  className="bebas"
                  style={{ fontSize: 36, color: "var(--gold)", lineHeight: 1 }}
                >
                  {valor}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--text-dim)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginTop: 6,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SecaoServicos({ onLoginClick }) {
  const [filtro, setFiltro] = useState("Todos");
  const categorias = ["Todos", ...new Set(SERVICOS.map((s) => s.categoria))];
  const lista =
    filtro === "Todos"
      ? SERVICOS
      : SERVICOS.filter((s) => s.categoria === filtro);
  return (
    <section
      id="servicos-section"
      style={{ padding: "80px 24px", background: "var(--surface)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 900,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            O que fazemos
          </p>
          <h2
            className="bebas"
            style={{
              fontSize: "clamp(36px, 5vw, 52px)",
              letterSpacing: "0.04em",
            }}
          >
            NOSSOS SERVIÇOS
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              marginTop: 12,
              maxWidth: 480,
              margin: "12px auto 0",
            }}
          >
            Preços a partir de — valor final confirmado após avaliação do estado
            do tênis.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setFiltro(c)}
              style={{
                padding: "8px 18px",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.18s",
                border: "1px solid",
                background: filtro === c ? "var(--gold)" : "transparent",
                borderColor: filtro === c ? "var(--gold)" : "var(--border)",
                color: filtro === c ? "#0a0a0a" : "var(--text-muted)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {lista.map((s) => (
            <div
              key={s.id}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "20px 22px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold-border)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 900,
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  background: "var(--gold-dim)",
                  padding: "3px 8px",
                  borderRadius: 99,
                  border: "1px solid var(--gold-border)",
                }}
              >
                {s.categoria}
              </span>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: "var(--text)",
                  marginTop: 10,
                  marginBottom: 6,
                }}
              >
                {s.titulo}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  marginBottom: 14,
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: "var(--gold)",
                    }}
                  >
                    R$ {s.preco},00
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-dim)",
                        fontWeight: 400,
                      }}
                    >
                      +
                    </span>
                  </p>
                  {PRAZOS[s.titulo] && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 4,
                      }}
                    >
                      <Icon
                        name="clock"
                        size={11}
                        style={{ color: "var(--text-dim)" }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          color: "var(--text-dim)",
                          fontWeight: 600,
                        }}
                      >
                        {PRAZOS[s.titulo]}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-gold"
                  style={{ fontSize: 11, padding: "8px 14px" }}
                  onClick={() =>
                    abrirWpp(
                      `Olá! Gostaria de um orçamento para: ${s.titulo} (R$ ${s.preco},00+).`,
                    )
                  }
                >
                  Solicitar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            borderRadius: 20,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "var(--gold)",
                marginBottom: 4,
              }}
            >
              ⭐ Programa Lira+ — Ganhe pontos em cada serviço
            </p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              1 ponto por R$ 1 gasto. Acumule e resgate descontos, serviços
              grátis e muito mais.
            </p>
          </div>
          <button
            className="btn btn-gold"
            style={{ fontSize: 13, padding: "12px 24px", flexShrink: 0 }}
            onClick={onLoginClick}
          >
            <Icon name="award" size={16} />
            Criar conta grátis
          </button>
        </div>
      </div>
    </section>
  );
}

function SecaoDepoimentos() {
  return (
    <section
      id="depoimentos"
      style={{ padding: "80px 24px", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 900,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            O que dizem nossos clientes
          </p>
          <h2
            className="bebas"
            style={{
              fontSize: "clamp(36px, 5vw, 52px)",
              letterSpacing: "0.04em",
            }}
          >
            DEPOIMENTOS
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {DEPOIMENTOS.map((d) => (
            <div
              key={d.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold-border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: d.nota }).map((_, j) => (
                  <span key={j} style={{ color: "var(--gold)", fontSize: 14 }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                "{d.texto}"
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 12,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "var(--gold-dim)",
                    border: "1px solid var(--gold-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 900,
                      color: "var(--gold)",
                    }}
                  >
                    {d.inicial}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      color: "var(--text)",
                    }}
                  >
                    {d.nome}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      color: "var(--text-dim)",
                      marginTop: 1,
                    }}
                  >
                    {d.servico} · {d.cidade}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecaoLocalizacao() {
  return (
    <section
      id="localizacao"
      style={{ padding: "80px 24px", background: "var(--surface)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 900,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            Onde estamos
          </p>
          <h2
            className="bebas"
            style={{
              fontSize: "clamp(36px, 5vw, 52px)",
              letterSpacing: "0.04em",
            }}
          >
            LOCALIZAÇÃO & ATENDIMENTO
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "24px 26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <Icon
                  name="map-pin"
                  size={18}
                  style={{ color: "var(--gold)" }}
                />
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Área de Atendimento
                </p>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                  marginBottom: 16,
                }}
              >
                {LOCATION.descricao}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--green-dim)",
                  border: "1px solid var(--green-border)",
                  borderRadius: 10,
                  padding: "8px 14px",
                }}
              >
                <Icon
                  name="check-circle"
                  size={14}
                  style={{ color: "var(--green)" }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--green)",
                    fontWeight: 700,
                  }}
                >
                  {LOCATION.coletaGratis}
                </span>
              </div>
            </div>
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "24px 26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <Icon name="clock" size={18} style={{ color: "var(--gold)" }} />
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Horário de Atendimento
                </p>
              </div>
              {LOCATION.horarios.map(({ dia, hora }) => (
                <div
                  key={dia}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "9px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {dia}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--gold)",
                    }}
                  >
                    {hora}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              background:
                "radial-gradient(ellipse at 0% 0%, rgba(245,200,66,0.1) 0%, var(--bg) 60%)",
              border: "1px solid var(--gold-border)",
              borderRadius: 18,
              padding: "28px 26px",
            }}
          >
            <p
              className="bebas"
              style={{ fontSize: 26, letterSpacing: "0.06em", marginBottom: 8 }}
            >
              FALE COM A GENTE
            </p>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginBottom: 22,
              }}
            >
              Tire dúvidas, solicite um orçamento ou agende a coleta do seu
              tênis. Respondemos em até 1 hora.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                className="btn btn-gold"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 14,
                  padding: "14px",
                }}
                onClick={() =>
                  abrirWpp("Olá! Gostaria de solicitar um orçamento.")
                }
              >
                <Icon name="message-circle" size={18} />
                Solicitar orçamento via WhatsApp
              </button>
              <button
                className="btn btn-ghost"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 13,
                  padding: "12px",
                }}
                onClick={() =>
                  abrirWpp(
                    "Olá! Gostaria de saber mais sobre a coleta do meu tênis.",
                  )
                }
              >
                <Icon name="package" size={16} />
                Agendar coleta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onLoginClick }) {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "48px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
          }}
        >
          <p style={{ fontSize: 11, color: "var(--text-dim)" }}>
            © {new Date().getFullYear()} Lira Sneakers · {LOCATION.cidade},{" "}
            {LOCATION.estado}
          </p>
          <p style={{ fontSize: 11, color: "var(--text-dim)" }}>
            Atendimento via WhatsApp
          </p>
        </div>
      </div>
    </footer>
  );
}

function LoginModal({ onClose }) {
  const [modo, setModo] = useState("login");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const { login, cadastrar } = useApp();

  const inputStyle = {
    width: "100%",
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "11px 14px",
    color: "var(--text)",
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "var(--font-body)",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usuario || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    const ok = await login(usuario, senha);
    setLoading(false);
    if (ok) onClose();
    else setErro("Usuário ou senha incorretos.");
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!nome || !email || !tel || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    const ok = await cadastrar(nome, email, tel, senha);
    setLoading(false);
    if (ok) onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 24,
          padding: "32px 28px",
          width: "100%",
          maxWidth: 420,
          animation: "scaleIn 0.2s ease both",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <p
            className="bebas"
            style={{ fontSize: 22, letterSpacing: "0.08em" }}
          >
            ACESSAR CONTA
          </p>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <Icon name="chevron-up" size={20} />
          </button>
        </div>
        <div className="tabs-wrap" style={{ marginBottom: 20 }}>
          {[
            ["login", "Entrar"],
            ["cadastro", "Criar conta"],
          ].map(([id, lbl]) => (
            <button
              key={id}
              onClick={() => {
                setModo(id);
                setErro("");
              }}
              className={`tab-btn ${modo === id ? "active" : ""}`}
            >
              {lbl}
            </button>
          ))}
        </div>
        <div
          style={{
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 3,
            }}
          >
            Acesso demo
          </p>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Usuário: <strong style={{ color: "var(--text)" }}>admin</strong> ·
            Senha: <strong style={{ color: "var(--text)" }}>1234</strong>
          </p>
        </div>
        {erro && (
          <div
            className="alert alert-error"
            style={{ marginBottom: 14, fontSize: 12 }}
          >
            <Icon name="alert-circle" size={14} />
            {erro}
          </div>
        )}
        {modo === "login" ? (
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <input
              style={inputStyle}
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
                setErro("");
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(245,200,66,0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
              }}
            />
            <input
              style={inputStyle}
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro("");
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(245,200,66,0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
              }}
            />
            <button
              type="submit"
              className="btn btn-gold"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
            >
              {loading ? (
                <>
                  <Icon
                    name="loader-2"
                    size={16}
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  Entrando...
                </>
              ) : (
                <>
                  <Icon name="log-in" size={16} /> Entrar
                </>
              )}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleCadastro}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {[
              ["Nome completo", nome, setNome, "text"],
              ["E-mail", email, setEmail, "email"],
              ["Telefone", tel, setTel, "tel"],
              ["Senha", senha, setSenha, "password"],
            ].map(([placeholder, val, setter, type]) => (
              <input
                key={placeholder}
                style={inputStyle}
                placeholder={placeholder}
                type={type}
                value={val}
                onChange={(e) => {
                  setter(e.target.value);
                  setErro("");
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(245,200,66,0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                }}
              />
            ))}
            <button
              type="submit"
              className="btn btn-gold"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
            >
              {loading ? (
                <>
                  <Icon
                    name="loader-2"
                    size={16}
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  Criando...
                </>
              ) : (
                <>
                  <Icon name="user-plus" size={16} /> Criar conta
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <Hero onLoginClick={() => setShowLogin(true)} />
      <SecaoServicos onLoginClick={() => setShowLogin(true)} />
      <SecaoDepoimentos />
      <SecaoLocalizacao />
      <Footer onLoginClick={() => setShowLogin(true)} />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .localizacao-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
