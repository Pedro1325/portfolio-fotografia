"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1.5rem",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          <h1>Algo deu errado</h1>
          <button type="button" onClick={() => reset()}>
            Tentar de novo
          </button>
        </main>
      </body>
    </html>
  );
}
