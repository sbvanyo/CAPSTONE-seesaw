import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayground } from '../../../api/playgroundData';
import PlaygroundForm from '../../../components/PlaygroundForm';

export default function EditPlayground() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayground(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <PlaygroundForm playgroundObj={editItem} />
  );
}
