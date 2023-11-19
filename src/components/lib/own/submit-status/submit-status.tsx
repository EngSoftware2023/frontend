import { Button } from "antd";
import { useState } from "react";

export type DataSubmitState = {
  send: boolean;
  error: boolean;
  loading: boolean;
  message: string;
};

export default function SubmitState(initialMessage: string) {
  const [state, setState] = useState<DataSubmitState>({
    error: false,
    loading: false,
    send: false,
    message: initialMessage,
  });

  return {
    setNothing: () =>
      setState({ message: "", send: false, loading: true, error: false }),
    setLoading: () =>
      setState({ message: "", send: false, loading: true, error: false }),
    setError: (message: string) =>
      setState({ message, send: true, loading: false, error: true }),
    setSendOk: (message: string) =>
      setState({ message, send: true, loading: false, error: false }),
    SubmitButton: ({className}:{className?: string}) => (
      <Button
        className={className}
        htmlType="submit"
        title={state.message}
        loading={state.loading}
        danger={state.send && state.error}
        type={!state.send ? "primary" : "default"}
      >
        {state.message}
      </Button>
    ),
  };
}
