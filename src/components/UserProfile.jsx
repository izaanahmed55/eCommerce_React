const UserProfile = () => {
  return (
    <>
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://img.freepik.com/premium-vector/man-silhouette-profile-male-avatar-anonymous-icon-censored-face_434359-85.jpg"
                alt="John Doe"
              />
            </div>
            <div className="p-2">
              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Name
                    </td>
                    <td className="px-2 py-2">
                      Hello
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Username
                    </td>
                    <td className="px-2 py-2">hello</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">john@exmaple.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
