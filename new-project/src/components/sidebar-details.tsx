
type SidebarDetails = {
  data?: any;
  drawerOpen?: boolean;
};

export const SidebarDetails = ({ drawerOpen }: SidebarDetails) => {
  return (
    <>
      {drawerOpen && (
        <div className="flex flex-col items-end gap-4 self-stretch">
          {/* Info you want to show in sidebar goes here */}
        </div>
      )}

      {!drawerOpen && (
        <div className="w-{80} flex flex-col items-center justify-center gap-3 self-stretch pt-6 pb-6">
          {/* Info you want to show in sidebar goes here */}
        </div>
      )}
    </>
  );
};

export const SidebarDetailsMobile = ({ }: SidebarDetails) => {
  return (
    <div className="flex flex-row items-center justify-between">
      {/* Info you want to show in sidebar goes here */}
    </div>
  );
};
