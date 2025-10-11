# Troubleshooting

app/countdown/runner.tsx caused Error:

ERROR  Warning: Cannot update a component (`ImperativeApiEmitter`) while rendering a different component (`CountDownRunner(./countdown/runner.tsx)`). To locate the bad setState() call inside `CountDownRunner(./countdown/runner.tsx)`, follow the stack trace as described in <https://react.dev/link/setstate-in-render>

The error happens when a state update is triggered during a render, often by calling a function that changes state from within the component body. In CountDownRunner, the router.back() call inside the setInterval callback is likely the cause. When the timer hits zero, it navigates away, but this can conflict with the component's rendering lifecycle.

Fix: Moving cleanup(); and router.back(); to useEffect.
