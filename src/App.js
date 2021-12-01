import './App.scss';
import 'antd/dist/antd.css';
import AppRouter from "./routers";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import "react-image-gallery/styles/scss/image-gallery.scss";
function App() {

  const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
        <AppRouter/>
      </QueryClientProvider>
  );
}

export default App;
