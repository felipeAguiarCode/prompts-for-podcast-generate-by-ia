<p align="center">
<img 
    src="./assets/cover.png"
    width="300"
/>
</p>

<p align="center">
<a href="https://dio.me/">
    <img 
        src="https://img.shields.io/badge/DIO-Code_The_Future-28DA77?logo=youtube" 
        alt="DIO - Code The Future">
</a>
<a href="https://dio.me/">
<img 
    src="https://img.shields.io/badge/🔴_LIVE_CODE-FF5E72" 
    alt="🔴 LIVE CODE">
</a>
</p>

<p align="center">
    preview do podcast
</p>

<div align="center">
    <audio src="output/podcast_editado.MP3" controls title="Podcast editado"></audio>
</div>

# Projeto Podcast Gerado por I.A.s


 > ℹ️ **NOTE:** Este é o repositório desenvolvido durante uma live no Youtube em parceria com a [DIO](https://dio.me)

Projeto com o objetivo de gerar um podcast utilizando ferramentas de IA através de prompts mais trabalhado.

Utilizer uma esteira de prompts para gerar cada etapa do processo criativo.

## 💻 Tecnologias utilizadas no projeto

- [ChatGPT](https://chat.openai.com/) 
- [MidJourney](https://www.midjourney.com/app/)
- [ElevenLabs](https://beta.elevenlabs.io/)
- [60db](https://60db.ai/) — geração de áudio via API (automatizado em `src/sixtydb.js`)
- [Capcut](https://www.capcut.com/pt-br/)

## ✨ Como foi feito ?

- Roteiro gerado via chatgpt
- Audio gerado pela elevenLabs (manual) **ou** pela 60db (automatizado via `src/sixtydb.js`)
- Midjourney Para gerar capas
- Capcut para tratar aúdio e adicionar sons de fundo

## 📚 Materiais

- [Link da live no Youtube](https://www.youtube.com)
- [Notion Template](https://helpful-jump-17b.notion.site/PAS-Podcast-AI-Studio-210489e15d7a4a73b743bb159e45d06f?pvs=4)
- [Editor de aúdio](https://www.capcut.com/editor?from_page=landing_page&__action_from=picture_V%C3%ADdeos%20profissionais%20em%20minutos,%20n%C3%A3o%20em%20horas.)


## 🛠️ Instruções de execução

Utilize os prompts dentro do link do `Notion` fornecido na parte de `Materiais` para criar um podcast de maneira automatizada, para isso siga o passo a passo abaixo.

- 🤖 1. Use os prompts de roteiro no `chagpt`
- 🤖 2. Use os prompts de roteiro gerados pelo chatgpt no  `ElevenLabs` — ou gere o áudio automaticamente com o script da `60db` (ver seção abaixo)
- 🤖 3. Use os prompts de artes no `midjourney`

## 🔊 Gerando áudio com 60db (script)

Em vez de colar o roteiro manualmente em um site, você pode gerar o áudio direto pela API da [60db](https://60db.ai/) usando o script `src/sixtydb.js`.

**Requisito:** Node.js 18+ (usa o `fetch` nativo, sem dependências).

1. Defina sua chave de API da 60db:

```powershell
# PowerShell (Windows)
$env:SIXTYDB_API_KEY="sua-chave"
```

```bash
# bash/zsh (Linux/macOS)
export SIXTYDB_API_KEY="sua-chave"
```

2. Rode o script passando o texto do roteiro:

```bash
node src/sixtydb.js "Texto do roteiro gerado pelo ChatGPT" output/synthesized_audio.mp3 [voice_id]
```

- O 2º argumento (caminho de saída) é opcional — o padrão é `output/synthesized_audio.mp3`.
- O 3º argumento (`voice_id`) é opcional — sem ele, a voz padrão da conta é usada.

O script também exporta as funções `synthesize()` e `synthesizeToFile()` caso queira usá-lo a partir de outro código. As opções suportadas seguem a [documentação da 60db](https://docs.60db.ai/api-reference/tts/text-to-speech): `voice_id`, `speed` (0.5–2.0), `stability` (0–100), `similarity` (0–100), `enhance` e `output_format` (`mp3`/`wav`/`ogg`/`flac`). O limite é de **5000 caracteres** por requisição.

## 👨‍💻 Expert

<p>
    <img 
      align=left 
      margin=10 
      width=80 
      src="https://avatars.githubusercontent.com/u/37452836?v=4"
    />
    <p>&nbsp&nbsp&nbspFelipe Aguiar<br>
    &nbsp&nbsp&nbsp
    <a 
        href="https://github.com/felipeAguiarCode">
        GitHub
    </a>
    &nbsp;|&nbsp;
    <a 
        href="www.linkedin.com/in/felipe-exe">
        LinkedIn
    </a>
    &nbsp;|&nbsp;
    <a 
        href="https://www.instagram.com/felipeaguiar.exe/">
        Instagram
    </a>
    &nbsp;|&nbsp;</p>
</p>
<br/><br/>
<p>

---

⌨️ com 💜 por [Felipe Aguiar](https://github.com/felipeAguiarCode)