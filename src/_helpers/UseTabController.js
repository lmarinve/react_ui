export default (tabs, initialProps = {}) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [activeProps, setActiveProps] = React.useState(initialProps)
  tabs[activeTab] ? tabs[activeTab].props = initialProps : null

  return {
    tabs: () => tabs,
    activeTab: () => tabs[activeTab],
    isActiveTab: tabIndex => tabIndex === activeTab,
    setActiveTab: (tabIndex, props = {}) => {
      if (Object.keys(props).length) {
        setActiveProps(props)
        tabs[activeTab].props = props
      }

      setActiveTab(tabIndex)
    },
    activeIndex: () => activeTab,
    activeProps: () => ({
      ...activeProps,
      setActiveTab: (tabIndex, props = {}) => {
        if (Object.keys(props).length) {
          setActiveProps(props)
          tabs[activeTab].props = props
        }
  
        setActiveTab(tabIndex)
      }
    })
  }
}
