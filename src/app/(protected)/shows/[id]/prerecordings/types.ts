export type PrerecordingListSearchParams = {
  after?: string;
  before?: string;
  timezone?: string;
};

export type PrerecordingListPageParams = {
  id: string;
};

export type PrerecordingListPageInput = {
  params: PrerecordingListPageParams;
  searchParams: PrerecordingListSearchParams;
};
