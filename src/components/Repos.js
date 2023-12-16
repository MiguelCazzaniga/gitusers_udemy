import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
import { toContainHTML } from '@testing-library/jest-dom/dist/matchers';
const Repos = () => {
  const {repos}=useContext(GithubContext)
   let languajes=repos.reduce((total,item)=>{
    const {languaje}=item
    if (!languaje)return total
    if (!total[languaje]){total[languaje]={label:languaje,value:1}}
    else{total[languaje]={...total[languaje],value:total[languaje].value+1}
   }
    return total
   },{})
  const chartData = [
    {
      label: "Venezuela",
      value: "290",
    },
    {
      label: "Saudi",
      value: "260",
    },
    {
      label: "Canada",
      value: "180",
    },
    {
      label: "Iran",
      value: "140",
    },
    {
      label: "Russia",
      value: "115",
    },
    {
      label: "UAE",
      value: "100",
    },
    {
      label: "US",
      value: "30",
    },
    {
      label: "China",
      value: "30",
    },
  ]

  return <section className='section'>

      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData}/> */}
        <Pie3D data={chartData}/>
      </Wrapper>
  </section>
  
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
