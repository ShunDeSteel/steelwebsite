export default function RootPage() {
  // GitHub Pages is static hosting. Avoid server redirects at runtime.
  // Provide a simple language selection landing page instead.
  return (
    <div style={{minHeight: "100vh", display: "grid", placeItems: "center"}}>
      <div style={{maxWidth: 720, padding: 24, textAlign: "center"}}>
        <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>
          Shunde Metal Processing Factory Co., Ltd.
        </h1>
        <p style={{opacity: 0.8, marginBottom: 24}}>
          Please choose your language / 请选择语言
        </p>
        <div style={{display: "flex", gap: 12, justifyContent: "center"}}>
          <a
            href="./en/"
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #ddd",
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
            }}
          >
            English
          </a>
          <a
            href="./zh/"
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #ddd",
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
            }}
          >
            中文
          </a>
        </div>
      </div>
    </div>
  );
}


