type ServiceEndedProps = {
  label: string;
};

const ServiceEnded: React.FC<ServiceEndedProps> = ({ label }) => {
  return (
    <div className="flex flex-col items-center">
      <div>{label}</div>
      <div className="flex h-12 items-center text-3xl text-gray-500 sm:h-15 sm:text-4xl lg:h-24 lg:text-6xl">
        運行終了
      </div>
      <div className="min-h-6" />
    </div>
  );
};

export default ServiceEnded;
