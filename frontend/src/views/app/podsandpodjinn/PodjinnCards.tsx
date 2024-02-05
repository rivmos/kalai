import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';

const PodjinnCards = () => {
    const cardFooter = (
        <div className="flex items-center">
            <Avatar
                size={60}
                className="mr-2"
                shape="circle"
                src="/img/avatars/thumb-1.jpg"
            />
            <span>
                <h6 className="text-m">Kristen Fisher</h6>
                <span className="text-m text-green-600">IT and Web Development</span>
            </span>
        </div>
    );

    return (
        <div className="flex">
            <Card
                clickable
                className="flex-1 hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <h4 className="font-bold my-2">Technology</h4>
            </Card>

            <Card
                clickable
                className="flex-1 hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid ml-4"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <h4 className="font-bold my-2">Technology</h4>
            </Card>

            <Card
                clickable
                className="flex-1 hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid ml-4"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <h4 className="font-bold my-2">Technology</h4>
            </Card>
        </div>
    );
};

export default PodjinnCards;