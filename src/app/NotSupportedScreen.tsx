function NotSupportedScreen() {
  return (
    <div
      className="fixed-screen z-100 hidden place-content-center overflow-hidden bg-gray-50/50 backdrop-blur-lg max-[270px]:grid"
      data-name="overlay-when-less-mobile"
    >
      <div className="w-full px-4 text-center text-xl font-bold uppercase text-pink-600">
        Màn hình không được hỗ trợ
      </div>
    </div>
  );
}

export default NotSupportedScreen;
