import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Avatar from '@/components/ui/Avatar'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { FiPackage } from 'react-icons/fi'

type Product = {
    id: string
    name: string
    img: string
    sold: number
}

type TopProductProps = {
    data?: Product[]
    className?: string
}

const { Tr, Td, TBody, THead, Th } = Table

const topProductsData = [
    {
        id: '12',
        name: 'Luminaire Giotto Headphones',
        img: '/img/products/product-1.jpg',
        sold: 252,
    },
    {
        id: '14',
        name: 'Black Sneaker',
        img: '/img/products/product-3.jpg',
        sold: 186,
    },
    {
        id: '15',
        name: 'Gray Hoodies',
        img: '/img/products/product-4.jpg',
        sold: 166,
    },
    {
        id: '16',
        name: 'Blue Backpack',
        img: '/img/products/product-5.jpg',
        sold: 93,
    },
    {
        id: '18',
        name: 'Strip Analog Watch',
        img: '/img/products/product-7.jpg',
        sold: 81,
    },
]

const ProductColumn = ({ row }: { row: Product }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center gap-2">
            {avatar}
            <span className="font-semibold">{row.name}</span>
        </div>
    )
}

const columnHelper = createColumnHelper<Product>()

const columns = [
    columnHelper.accessor('name', {
        header: 'Task Name',
        cell: (props) => {
            const row = props.row.original
            return <ProductColumn row={row} />
        },
    }),
    columnHelper.accessor('sold', {
        header: 'Estimated Time',
    }),
]

const TopProduct = ({ data = topProductsData, className }: TopProductProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-4">
                <h4>Latest quentify </h4>
            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    )
}

export default TopProduct
