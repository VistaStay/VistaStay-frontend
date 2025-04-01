import { Badge } from "@/components/ui/badge";
import { CloseButton } from "@/components/ui/close-button"; 

export default function TagWithClose() {
  const [tags, setTags] = useState(["Sample Tag"]);

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex gap-2">
      {tags.map((tag, index) => (
        <Badge key={index} className="flex items-center bg-purple-700 text-white px-4 py-2 rounded-lg">
          {tag}
          <CloseButton
            className="ml-2 text-white cursor-pointer"
            onClick={() => handleRemoveTag(tag)}
          />
        </Badge>
      ))}
    </div>
  );
}
