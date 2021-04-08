export default (tabs, initialProps = {}) => {
  const [activeTab, setActiveTab] = React.useState(0)

  return {
    tabs: () => tabs,
    activeTab: () => tabs[activeTab],
    isActiveTab: tabIndex => tabIndex === activeTab,
    setActiveTab: setActiveTab,
    activeIndex: () => activeTab,
  }
}
