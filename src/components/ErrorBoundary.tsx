import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-2xl font-semibold text-red-800">
              Something went wrong
            </h1>
            <p className="mt-3 text-red-600">
              An unexpected error occurred. Please refresh the page to try
              again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
