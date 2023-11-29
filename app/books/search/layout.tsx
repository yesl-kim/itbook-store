import Search from 'components/search/search'

const Layout = ({ children }: ComponentWithChildren) => (
  <div>
    <header className="mb-10">
      <Search />
    </header>
    <main>{children}</main>
  </div>
)

export default Layout
