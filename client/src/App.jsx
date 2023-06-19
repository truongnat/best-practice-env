import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { _fetch } from "./api";
import FormRegisterUser from "./components/FormRegisterUser";
const baseUrl = "http://localhost:9001";
const root = `${baseUrl}/`;
const user = `${baseUrl}/user`;
const config = `${baseUrl}/config`;

function App() {
  const [result, setResult] = useState({});

  const handleRegister = useCallback(async (data) => {
    const resultUser = await _fetch(user, "POST", JSON.stringify(data));
    console.log(resultUser);
    if (resultUser?.apiKey) {
      localStorage.setItem("apiKey", resultUser?.apiKey);
      const resultConfig = await _fetch(config);
      setResult((prev) => ({ ...prev, config: JSON.stringify(resultConfig) }));
    }
  }, []);

  useEffect(() => {
    const request = async () => {
      const resultRoot = await _fetch(root);
      const resultConfig = await _fetch(config);
      setResult((prev) => ({
        ...prev,
        root: resultRoot.message,
        config: resultConfig?.error ? resultConfig?.error : resultConfig,
      }));
    };
    request();
  }, []);

  return (
    <div className="flex flex-row space-x-5">
      <div className="flex flex-col w-[768px] bg-slate-700 rounded-xl space-y-5 p-5">
        <div className="flex flex-row items-start space-x-2">
          <div className="w-1/4 text-left font-bold">
            <span>API Enpoint</span>
          </div>
          <div className="w-1/4 text-left font-bold">
            <span>API Result</span>
          </div>
        </div>
        <div className="flex flex-row items-start space-x-2">
          <div className="w-1/4 text-left">
            <span>[API]: /</span>
          </div>
          <div className="w-3/4 text-left">
            <span>{result?.root}</span>
          </div>
        </div>

        <div className="flex flex-row items-start space-x-2">
          <div className="w-1/4 text-left">
            <span>[API]: /config</span>
          </div>
          <div className="w-3/4 text-left">
            <span>{JSON.stringify(result?.config, null, 2)}</span>
          </div>
        </div>
      </div>
      <FormRegisterUser callback={handleRegister} />
    </div>
  );
}

export default App;
