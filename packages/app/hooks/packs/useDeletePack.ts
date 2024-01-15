import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { deletePack } from 'app/store/packsStore';

export const useDeletePack = (id) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeletePack = () => {
    dispatch(
      deletePack({
        id,
      }),
    );
    router.replace('/feed');
  };

  return handleDeletePack;
};