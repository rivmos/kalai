import { Skeleton } from "@/components/ui"

const ProfileCardSkeleton = ({ length }: { length: number }) => {
    return (
        <div className="row">
            {Array.from({ length: length }).map(item => {
                return (
                    <div className="col-md-4">
                        <div className="inner-box">
                            <div className="dp-name">
                                <div className="dp-img">
                                </div>
                                <div className=" space-y-2">
                                    <Skeleton height={20} width={150} />
                                    <Skeleton height={10} width={80} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProfileCardSkeleton