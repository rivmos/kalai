
import { useState } from 'react'
import Card from '@/components/ui/Card'
import '../../../assets/styles/custom.css';
import Rating from '@mui/material/Rating';
import Table from '@/components/ui/Table'


const { Tr, Th, Td, THead, TBody, Sorter } = Table


const WallOfFame = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const cardData = [
    { rating: 7, text: 'Overall Rating: 7 Out of 10', label: 'CLIENTS RATING', givenBy: 'GIVEN BY PODJINNS' },

  ];

  const visibleCards = cardData.slice(startIndex, endIndex);

  return (
    <div>
      <Card className='mb-4 top-container flex'>
        <div className="mr-auto">
          <h4 style={{ color: "#455a64", fontSize: "24px" }}>Wall Of Fame</h4>
        </div>
      </Card>
      <Card className='mt-12 top-container rate-secc'>
        <div className='row pb-6 mb-4'>
          <div className='col-md-12'>
            <Table>
              <THead>
                <Tr>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Podjinn </Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Pod</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Project</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Client</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Rating</Th>

                </Tr>
              </THead>
              <TBody style={{ fontSize: "18px" }}>
                <Tr>
                  <Td>Alfreds Futterkiste</Td>
                  <Td>Maria Anders</Td>
                  <Td>Germany</Td>
                  <Td>Germany</Td>
                  <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                </Tr>
                <Tr>
                  <Td>Centro comercial Moctezuma</Td>
                  <Td>Francisco Chang</Td>
                  <Td>Mexico</Td>
                  <Td>Francisco Chang</Td>
                  <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td><Rating name="half-rating" defaultValue={5.5} precision={0.5} /></Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                </Tr>
              </TBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default WallOfFame




