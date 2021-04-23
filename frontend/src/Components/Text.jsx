function Text({content, className}) {
    return (
        <>
            <p className={`${className} hover:text-gray-700 dark:hover:text-white dark:text-gray-200`}>{content}</p>
        </>
    )
}

export default Text
