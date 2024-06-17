import { LoadingSpinner } from './Spinner';
import { SendUserOperationResult } from '@alchemy/aa-core';
import { chain } from '@/config/alchemy';
import { Hex } from 'viem';

export const OpStatus = ({
  sendUserOperationResultHash,
  isSendingUserOperation,
  isSendUserOperationError
}: {
  sendUserOperationResultHash: Hex | undefined;
  isSendingUserOperation: boolean;
  isSendUserOperationError: Error | null;
}) => {
  if (isSendUserOperationError) {
    console.log(isSendUserOperationError.message);
    return <div className="text-center">An error occurred. Try again!</div>;
  }

  if (isSendingUserOperation) {
    return <LoadingSpinner />;
  }

  if (sendUserOperationResultHash) {
    return (
      <a
        href={`${chain.blockExplorers?.default.url}/tx/${sendUserOperationResultHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-[#363FF9] hover:underline"
      >
        View transaction details
      </a>
    );
  }

  return <div className="invisible">placeholder</div>;
};
