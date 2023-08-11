import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import '@mdxeditor/editor/style.css'
import { ChangeCodeMirrorLanguage, ConditionalContents, InsertCodeBlock, InsertSandpack, SandpackConfig, ShowSandpackInfo, codeBlockPlugin, codeMirrorPlugin, sandpackPlugin, toolbarPlugin } from '@mdxeditor/editor'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
  ]
}

function App() {
  return (
    <MDXEditor 
      markdown='hello world'
      plugins={[
        codeBlockPlugin({defaultCodeBlockLanguage: 'js'}),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
        toolbarPlugin({toolbarContents: () => (
          <ConditionalContents
            options={[
                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                { fallback: () => ( <> 
                <InsertCodeBlock />
                <InsertSandpack />
              </>) }
              ]}
            />)
        })
      ]
      } 
    />
  )
}

export default App
