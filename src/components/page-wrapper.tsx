const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="animate-page-enter">{children}</div>;
};

export default PageWrapper;
