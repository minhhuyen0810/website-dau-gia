// data/auctionData.ts

export interface ProductItem {
  id: number;
  assetCode: string;
  startTime: string;
  endTime: string;
  startingPrice: number;
  registrationFee: number;
  biddingIncrement: number;
  maxBiddingSteps: number;
  depositAmount: number;
  auctionMethod: string;
  ownerName: string;
  viewingLocation: string;
  viewingTime: string;
  images: string[];
  icon: string; 
}

const auctionData: ProductItem[] = [
   {
    id: 1,
    assetCode: "ASSET001",
    startTime: "2023-10-10 10:00 AM",
    endTime: "2023-10-15 5:00 PM",
    startingPrice: 1000,
    registrationFee: 50,
    biddingIncrement: 100,
    maxBiddingSteps: 5,
    depositAmount: 200,
    auctionMethod: "English Auction",
    ownerName: "John Doe",
    viewingLocation: "123 Main Street",
    viewingTime: "2023-10-08 2:00 PM",
    images: [
      "https://plus.unsplash.com/premium_photo-1693723595870-2b8bad09b4c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
    ],
    icon: "https://plus.unsplash.com/premium_photo-1693723595870-2b8bad09b4c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    assetCode: "ASSET002",
    startTime: "2023-10-12 9:00 AM",
    endTime: "2023-10-18 4:00 PM",
    startingPrice: 800,
    registrationFee: 40,
    biddingIncrement: 50,
    maxBiddingSteps: 4,
    depositAmount: 150,
    auctionMethod: "English Auction",
    ownerName: "Jane Smith",
    viewingLocation: "456 Elm Street",
    viewingTime: "2023-10-10 3:00 PM",
    images: [
      "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
     icon:  "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
    {
    id: 3,
    assetCode: "ASSET002",
    startTime: "2023-10-12 9:00 AM",
    endTime: "2023-10-18 4:00 PM",
    startingPrice: 800,
    registrationFee: 40,
    biddingIncrement: 50,
    maxBiddingSteps: 4,
    depositAmount: 150,
    auctionMethod: "English Auction",
    ownerName: "Jane Smith",
    viewingLocation: "456 Elm Street",
    viewingTime: "2023-10-10 3:00 PM",
    images: [
      "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
     icon:  "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
    {
    id: 4,
    assetCode: "ASSET002",
    startTime: "2023-10-12 9:00 AM",
    endTime: "2023-10-18 4:00 PM",
    startingPrice: 800,
    registrationFee: 40,
    biddingIncrement: 50,
    maxBiddingSteps: 4,
    depositAmount: 150,
    auctionMethod: "English Auction",
    ownerName: "Jane Smith",
    viewingLocation: "456 Elm Street",
    viewingTime: "2023-10-10 3:00 PM",
    images: [
      "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
     icon:  "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
    {
    id: 5,
    assetCode: "ASSET002",
    startTime: "2023-10-12 9:00 AM",
    endTime: "2023-10-18 4:00 PM",
    startingPrice: 800,
    registrationFee: 40,
    biddingIncrement: 50,
    maxBiddingSteps: 4,
    depositAmount: 150,
    auctionMethod: "English Auction",
    ownerName: "Jane Smith",
    viewingLocation: "456 Elm Street",
    viewingTime: "2023-10-10 3:00 PM",
    images: [
      "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
     icon:  "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
    {
    id: 6,
    assetCode: "ASSET002",
    startTime: "2023-10-12 9:00 AM",
    endTime: "2023-10-18 4:00 PM",
    startingPrice: 800,
    registrationFee: 40,
    biddingIncrement: 50,
    maxBiddingSteps: 4,
    depositAmount: 150,
    auctionMethod: "English Auction",
    ownerName: "Jane Smith",
    viewingLocation: "456 Elm Street",
    viewingTime: "2023-10-10 3:00 PM",
    images: [
      "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
     icon:  "https://plus.unsplash.com/premium_photo-1670738772747-c81429db3725?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
 
];

export default auctionData;
