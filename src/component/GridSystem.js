import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';

const GridSystem = ({colCount,children,md}) => {

    console.log("children",children)
    console.log("children",children.length)
    console.log("colCount",colCount)
    let rowCount = Math.floor(children.length / colCount) + 1;
    let index = 0;

    const bulidGrid = () => {
        return (
            renderRows()
        )
    }

    const renderRows = () => {
        let rows= [];

        for (let row=0; row < rowCount; row++) {
            rows.push (
                <Row> {renderCols()} </Row>
            )
        }

        return rows;

    }

    const renderCols = () => {
        let cols = [];

        for (let col = 0; col < colCount; col++) {

            
            if (index < children.length) {
                cols.push (
                    <Col>
                        {children[index]}
                    </Col>
                )
                index++;
            }
        
        }

        console.log("cols",cols)
        return cols;
    }

  return (
    <Container> 
    {
        bulidGrid()
    }
   
    </Container>
  )
}

export default GridSystem