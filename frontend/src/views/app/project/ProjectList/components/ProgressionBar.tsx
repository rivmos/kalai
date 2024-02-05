import { useMemo } from 'react'
import Progress from '@/components/ui/Progress'

type ProgressionBarProps = {
    progression: number
}

const ProgressionBar = ({ progression }: ProgressionBarProps) => {
    const progressExtraProps = useMemo(() => {
        if (progression > 70) {
            return { color: 'green-500' }
        }

        if (progression < 40) {
            return { color: 'red-500' }
        }

        return {}
    }, [progression])

    return <Progress size="sm"  color="red-500" percent={40}  {...progressExtraProps} />
    // percent={progression}
}

export default ProgressionBar
