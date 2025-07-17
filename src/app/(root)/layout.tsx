
import StreamClientProvider from "../../components/providers/StreamProvider"

function Layout({children} : {children:React.ReactNode}) {
  return (
    <StreamClientProvider>
      {children}
    </StreamClientProvider>
  )
}

export default Layout