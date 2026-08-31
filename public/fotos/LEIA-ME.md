# Pasta de fotos

Coloque os arquivos de foto reais aqui, dentro da subpasta da categoria certa:

```
public/fotos/
  casamentos/   → fotos de casamentos e eventos
  retratos/     → retratos, ensaios individuais, casal, família
  editorial/    → editorial, moda, testes, campanhas
```

## Como uma foto aparece no site

1. Copie o arquivo (`.jpg`, `.jpeg`, `.png` ou `.webp`) para a subpasta certa.
   Dica: use nomes simples, sem espaço e sem acento — ex: `ana-e-joao-01.jpg`.
2. Cadastre essa foto:
   - **Pelo site:** abra `/admin`, use "Adicionar foto" (informe o nome
     exato do arquivo que você acabou de copiar), ou edite o campo "Arquivo
     (src)" de uma foto já existente na lista.
   - **Ou direto no código:** abra `lib/portfolioData.ts` e mude o campo
     `src` da foto para `"/fotos/<categoria>/<nome-do-arquivo>"` (com a
     barra `/` no início — é assim que o Next.js serve arquivos da pasta
     `public/`).
3. Rode `npm run dev` (se ainda não estiver rodando) e confira em
   `http://localhost:3000`.

Fotos com `src: null` em `lib/portfolioData.ts` continuam aparecendo como
um quadro de "substitua" — isso é esperado até você colocar o arquivo real.

## Tamanho recomendado

Comprima as imagens antes de colocar aqui (ex: 1600–2000px no lado maior,
qualidade ~80%) — este projeto usa `<img>` simples, sem otimização
automática de imagem.
