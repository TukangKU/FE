const Footer = () => {
  return (
    <footer className="w-full container min-h-[20vh] bg-white dark:bg-black">
      <div className="flex items-center container p-6 h-full">
        <p>Copyright {new Date().getFullYear()} TukangKU. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
