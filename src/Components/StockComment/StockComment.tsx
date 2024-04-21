import { useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm'
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import Spinner from '../Spinner/Spinner';
import StockCommentList from '../StockCommentList/StockCommentList';

interface Props {
  stockSymbol: string
}
type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComment] = useState<CommentGet[] | null>(null)
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    getComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol)
      .then((res) => {
        if(res) {
          toast.success("Comment created successfully!")
          getComments()
        }
      })
      .catch((e) => {
        toast.warning(e)
      });
  }

  const getComments = () => {
    setLoading(true)
    commentGetAPI(stockSymbol).then((res) => {
        setLoading(false)
        setComment(res && res.data ? res.data : null)
      })
  }
  return (
    <div className= "flex flex-col">
      { loading ? <Spinner /> : <StockCommentList comments={comments!} /> }
      <StockCommentForm handleComment={handleComment} />
    </div>
  )
}

export default StockComment