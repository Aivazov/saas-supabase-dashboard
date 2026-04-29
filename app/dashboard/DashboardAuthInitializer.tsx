'use client';
import { useInitAuth } from '@/hooks/useInitAuth';

// type Props = {}

const DashboardAuthInitializer = () => {
  // const DashboardAuthInitializer = (props: Props) => {
  useInitAuth();
  return null;
};

export default DashboardAuthInitializer;
