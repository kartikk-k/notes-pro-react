const CreatedDate = ({ created }) => {

    let createdDate = new Date(created)
    let currentDate = new Date()
    let elapsedTime = currentDate.getTime() - createdDate.getTime()
    let elapsedDays = Math.round(elapsedTime / (1000 * 60 * 60 * 24))
    let date = ''
    if (elapsedDays === 0) {
        date = 'Created: Today'
        return date
    } else {
        date = 'Created: ' + elapsedDays + ' days ago'
        return date
    }
}

export default CreatedDate