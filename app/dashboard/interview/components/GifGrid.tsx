import styled from '@emotion/styled';
import type Giphy from 'giphy-api';
import GifCard from './GifCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

export default function GifGrid({ allGifs }: { allGifs?: Giphy.GIFObject[] }) {
  if(!allGifs) return null;
  return (
    <Grid>
      {allGifs?.map((gif) => (
        <GifCard gif={gif} />
      ))}
    </Grid>
  );
}