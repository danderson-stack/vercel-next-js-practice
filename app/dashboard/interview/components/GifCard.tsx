import styled from '@emotion/styled';
import type * as Giphy from 'giphy-api';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavoritedGifs } from '../FavoritedGifsProvider';

const Card = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
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

const HeartButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: red;

  /* Optional hover/active styling */
  &:hover {
    opacity: 0.85;
  }
`;

export default function GifCard({ gif }: { gif: Giphy.GIFObject }) {
  const { toggle, isFavorited } = useFavoritedGifs();
  const favorited = isFavorited(gif.id);

  return (
    <Card>
      <Img src={gif.images.downsized.url} alt={gif.title || 'GIF'} loading="lazy" />
      <HeartButton onClick={() => toggle(gif.id)}>
        {favorited ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
      </HeartButton>
    </Card>
  );
}