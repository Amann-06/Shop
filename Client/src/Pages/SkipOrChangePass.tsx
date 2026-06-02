import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const SkipOrChangePass = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50">
      <div className="shadow-md border p-10 rounded-xl w-96 text-center bg-white">
        
        <h1 className="text-2xl font-semibold mb-4">
          What would you like to do?
        </h1>

        <p className="text-gray-600 mb-8">
          Do you want to change your password now or continue without changing it?
        </p>

        <div className="flex flex-col gap-3">
          <Button color="bg-purple-600 hover:bg-purple-700">
            Change Password
          </Button>

          <Button onClick={()=>navigate('/lol')} color="bg-gray-500 hover:bg-gray-600">
            Continue Without Changing
          </Button>
        </div>

      </div>
    </div>
  );
};

export default SkipOrChangePass;