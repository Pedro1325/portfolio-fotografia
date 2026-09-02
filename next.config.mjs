/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Server Actions recusam requisições acima de 1MB por padrão — pouco
    // pra uma foto. O limite de verdade (tipo e tamanho de arquivo) é
    // validado no servidor, em lib/actions/portfolio.ts (uploadPhoto).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
