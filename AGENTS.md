<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- PCC pages use shared presentation sections and data in `src/components/pcc`, with leaf routes for each navigation destination, so content remains reusable while each page gets its own metadata.
- The quote form validates locally then hands the inquiry to WhatsApp; no lead database or upload storage is connected yet, so it must not claim submission to a server.