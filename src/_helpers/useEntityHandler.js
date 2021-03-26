export default (initialValue = {}) => {
    const [entity, setEntity] = React.useState(initialValue)
    const isThereActiveEntity = () => Object.keys(entity).length > 0

    return {
        entity: () => entity,
        setEntity,
        isThereActiveEntity 
    }
}