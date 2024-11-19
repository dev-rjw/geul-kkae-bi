import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// 로그아웃
export const useSignout = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleSignout = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃에 실패했습니다.');
    } else {
      Swal.fire({
        html: `<div class="text-gray-700">로그아웃 되었습니다.</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });

      router.push('/');
    }
  };

  return { handleSignout };
};
