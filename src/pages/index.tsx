import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
    const [split, setSplit] = useState<string>('->')
    const [rule, setRule] = useState<string>('')
    const [file, setFile] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')
    const [result, setResult] = useState<string>('')

    useEffect(() => {
        if (!file || !rule || !split) return
        const rules = rule
            .split(/\n|\r/g)
            .filter((rule) => rule !== '')
            .map((rule) => rule.split(split))
        let _file = file
        rules.forEach((_rule) => {
            const [from, to] = _rule
            _file = _file.replaceAll(from, to)
        })
        setResult(_file)
    }, [file, rule, split])
    const handleSplitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSplit(e.target.value)
    }
    const handleRuleChange = (e: any) => {
        const reader = new FileReader()
        reader.onload = async (e: any) => {
            const text = e.target.result
            setRule(text)
        }
        reader.readAsText(e.target.files[0])
    }
    const handleFileChange = (e: any) => {
        const reader = new FileReader()
        reader.onload = async (e: any) => {
            const text = e.target.result
            setFile(text)
        }
        reader.readAsText(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const downloadTxtFile = () => {
        const element = document.createElement('a')
        const file = new Blob([result], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `edited_${fileName}`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <main className={styles.main}>
            <h1>Replace</h1>
            <br />
            <form onSubmit={(e) => e.preventDefault()}>
                <h3>구분자</h3>
                <div className={styles.divide}>
                    <label>구분자: </label>
                    <input
                        name='split'
                        type='text'
                        value={split}
                        onChange={handleSplitChange}
                    />
                </div>
                <h3>규칙</h3>
                <div className={styles.divide}>
                    <label htmlFor='file'>규칙</label>
                    <input
                        name='rule'
                        type='file'
                        onChange={handleRuleChange}
                    />
                    <div>
                        규칙파일 예시
                        <p>A{split}A`</p>
                        <p>B{split}B`</p>
                    </div>
                </div>
                <h3>파일</h3>
                <div className={styles.divide}>
                    <label htmlFor='file'>파일</label>
                    <input
                        name='file'
                        type='file'
                        onChange={handleFileChange}
                    />
                </div>
                {result && (
                    <>
                        <h3>결과</h3>
                        <div className={styles.divide}>
                            <input
                                type='button'
                                value='다운로드'
                                onClick={downloadTxtFile}
                            />
                        </div>
                    </>
                )}
                {(rule || file) && <hr />}
                {rule && (
                    <>
                        <h3>rule</h3>
                        <div className={styles.divide}>
                            <pre>{rule}</pre>
                        </div>
                    </>
                )}
                {file && (
                    <>
                        <h3>file</h3>
                        <div className={styles.divide}>
                            <pre>{file}</pre>
                        </div>
                    </>
                )}
                {result && (
                    <>
                        <h3>result</h3>
                        <div className={styles.divide}>
                            <pre>{result}</pre>
                        </div>
                    </>
                )}
            </form>
        </main>
    )
}
