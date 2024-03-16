import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-markdown'; // Add more modes as needed
import 'ace-builds/src-noconflict/theme-monokai';

const Editor1 = ({ socketRef, roomId }) => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  useEffect(() => {
    socketRef.current.emit('update language', { roomId, languageUsed: language });
  }, [language, roomId, socketRef]);

  function handleLanguageChange(e) {
    setLanguage(e.target.value);
  }

  function handleCodeChange(newValue) {
    setCode(newValue);
    socketRef.current.emit('sync code', { roomId, code: newValue });
  }

  return (
    <div>
      <div>
        <label htmlFor="language">Select Language:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="markdown">Markdown</option>
          {/* Add more language options as needed */}
        </select>
      </div>
      <AceEditor
        mode={language}
        theme="monokai"
        onChange={handleCodeChange}
        value={code}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default Editor1;
