type ServiceEndedProps = {
  label: string;
};

const ServiceEnded: React.FC<ServiceEndedProps> = ({ label }) => {
  return (
    <div className="flex flex-col items-center">
      <div>{label}</div>
      <div className="py-4 text-2xl text-gray-500 sm:text-3xl">運行終了</div>
    </div>
  );
};

export default ServiceEnded;
