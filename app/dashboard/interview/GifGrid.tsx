import styled from '@emotion/styled';
import type * as Giphy from 'giphy-api';

type Props = { allGifs: Giphy.MultiResponse[] };

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1; /* perfect square tiles */
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default function GifGrid({ allGifs }: Props) {
  const items = allGifs.flatMap((r) => r.data); // Giphy.GIFObject[]

  return (
    <Grid>
      {items.map((gif) => (
        <Card key={gif.id}>
          <Img
            loading="lazy"
            src={gif.images.downsized.url}
            alt={gif.title || 'GIF'}
          />
        </Card>
      ))}
    </Grid>
  );
}