import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleNeighborhood } from '../../../api/neighborhoodData';
import NeighborhoodForm from '../../../components/NeighborhoodForm';

export default function EditNeighborhood() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleNeighborhood(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <NeighborhoodForm neighborhoodObj={editItem} />
  );
}
